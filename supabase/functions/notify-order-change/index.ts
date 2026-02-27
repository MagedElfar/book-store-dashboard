import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const { record, type } = await req.json()
        const actorId = record.updated_by || record.user_id
        const orderNo = record.order_number
        const orderId = record.id
        // 1. جلب بيانات الـ Staff
        const { data: staffMembers } = await supabase
            .from('profiles')
            .select('id, fcm_token')
            .in('role', ['admin', 'support'])

        if (!staffMembers || staffMembers.length === 0) return new Response("No staff", { status: 200 })

        const notifications = []
        const fcmTokens: string[] = []

        for (const staff of staffMembers) {
            if (staff.id === actorId) continue
            const title = type === 'INSERT' ? "New Order Received 🆕" : "Order Status Updated 📝"
            const body = type === 'INSERT'
                ? `A new order has been placed. Order: #${orderNo}`
                : `Order #${orderNo} has been updated to: ${record.status.toUpperCase()}`

            notifications.push({ user_id: staff.id, title, body, is_read: false, data: orderId })
            if (staff.fcm_token) fcmTokens.push(staff.fcm_token)
        }

        // 2. تسجيل في الداتابيز
        if (notifications.length > 0) {
            await supabase.from('notifications').insert(notifications)
        }

        // 3. إرسال لـ Firebase باستخدام الطريقة اليدوية (Native)
        if (fcmTokens.length > 0) {
            const serviceAccount = JSON.parse(Deno.env.get('FCM_SERVICE_ACCOUNT') || '{}')
            const token = await getAccessToken(serviceAccount)

            for (const fcmToken of fcmTokens) {
                await fetch(`https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: {
                            token: fcmToken,
                            notification: {
                                title: type === 'INSERT' ? "New Order" : "Order Update",
                                body: `Order #${orderNo} ${type === 'INSERT' ? 'received' : 'updated'}`
                            }
                        }
                    }),
                })
            }
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error) {
        console.error("Function Error:", error.message)
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
})

// دالة توليد التوكن يدوياً بدون مكتبات خارجية
async function getAccessToken(serviceAccount: any) {
    const header = { alg: "RS256", typ: "JWT" }
    const now = Math.floor(Date.now() / 1000)
    const claim = {
        iss: serviceAccount.client_email,
        scope: "https://www.googleapis.com/auth/cloud-platform",
        aud: "https://oauth2.googleapis.com/token",
        exp: now + 3600,
        iat: now,
    }

    const encodedHeader = btoa(JSON.stringify(header))
    const encodedClaim = btoa(JSON.stringify(claim))
    const signMe = `${encodedHeader}.${encodedClaim}`

    const pemHeader = "-----BEGIN PRIVATE KEY-----"
    const pemFooter = "-----END PRIVATE KEY-----"
    const pemContents = serviceAccount.private_key
        .replace(pemHeader, "")
        .replace(pemFooter, "")
        .replace(/\s/g, "")

    const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0))
    const key = await crypto.subtle.importKey(
        "pkcs8",
        binaryKey,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false,
        ["sign"]
    )

    const signature = await crypto.subtle.sign(
        "RSASSA-PKCS1-v1_5",
        key,
        new TextEncoder().encode(signMe)
    )

    const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "")

    const jwt = `${signMe}.${encodedSignature}`

    const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    })

    const data = await res.json()
    return data.access_token
}