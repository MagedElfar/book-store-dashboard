/**
 * Firebase Cloud Messaging Service Worker
 * Handles background push notifications.
 */

// ----------------------------------------------------------------------
// IMPORTANT: REPLACE WITH YOUR FIREBASE CONFIG
// ----------------------------------------------------------------------
// Credentials provided by user on 2026-01-14
const firebaseConfig = {
    apiKey: "AIzaSyCkim4moSpmQ1645MyT3NWjj5A11esXI9w",
    authDomain: "book-store-app-4e96b.firebaseapp.com",
    projectId: "book-store-app-4e96b",
    storageBucket: "book-store-app-4e96b.firebasestorage.app",
    messagingSenderId: "847592073138",
    appId: "1:847592073138:web:22e069d365338a5c7626ab",
    measurementId: "G-EHLPJEY90Z"
};

// Import scripts
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

/**
 * Handle background messages
 * If the payload contains a 'notification' object, the browser will usually
 * display it automatically. This handler allows us to customize it or
 * handle data-only messages.
 */
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Background message received:', payload);

    // Extract title and options from payload
    // If 'notification' is present, use it. Otherwise fallback to 'data'
    const title = payload.notification?.title || payload.data?.title || 'New Notification';
    const options = {
        body: payload.notification?.body || payload.data?.body || payload.data?.content || '',
        icon: payload.notification?.icon || payload.data?.icon || '/logo/logo.png',
        image: payload.notification?.image || payload.data?.imageUrl, // 'image' is standard, 'imageUrl' from custom payload
        data: payload.data,
        tag: payload.notification?.tag || payload.data?.id || 'notification',
        timestamp: Date.now(),
        vibrate: [200, 100, 200],
        requireInteraction: true, // Keep it visible until dismissed
        actions: [
            { action: 'open', title: 'View' }
        ],
        // Attempt to play sound (browser support varies)
        sound: '/sounds/notification.mp3'
    };

    // Check if any window is currently visible
    return self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
        const isAnyVisible = windowClients.some((client) => client.visibilityState === 'visible');

        // If the app is visible, don't show the notification
        if (isAnyVisible) {
            console.log('[firebase-messaging-sw.js] App is visible, suppressing notification');
            return;
        }

        // Explicitly show the notification
        return self.registration.showNotification(title, options);
    });
});

// Force SW to update immediately
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

/**
 * Handle Notification Click
 */
self.addEventListener('notificationclick', (event) => {
    console.log('[firebase-messaging-sw.js] Notification click:', event);

    // Close the notification
    event.notification.close();

    // Handle actions
    if (event.action === 'dismiss') {
        return;
    }

    // Get URL to open
    // 1. Try payload.data.actionUrl
    // 2. Try fcmOptions.link (if correctly populated by SDK)
    // 3. Fallback to root
    const actionUrl = event.notification.data?.actionUrl || event.notification.data?.link || '/dashboard';

    // This looks for all windows of this PWA/Site match
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // If we have an open window, focus it and navigate
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    client.focus();
                    if (actionUrl) {
                        client.navigate(actionUrl);
                    }
                    return;
                }
            }

            // Otherwise open a new window
            if (clients.openWindow) {
                return clients.openWindow(actionUrl);
            }
        })
    );
});
