# Multi-Language Online Book Store - Full Project Map

## 1️⃣ User Roles & Access

| Role      | Access                                                                 |
|-----------|------------------------------------------------------------------------|
| Guest     | Website: Browse free books, view details, search/filter, switch language |
| User      | Website: All Guest permissions + Profile, Wishlist, Cart/Checkout, Download/Read books, Reviews |
| Support   | Dashboard: Books Management, Users & Orders Management, Chat Support, Analytics, Notifications |
| Admin     | Dashboard: All Support permissions + Full permissions (CRUD all books, manage users/roles, Analytics, Shortcuts) |

> **Note:** Users and Guests **never** access the Dashboard. Only Staff (Admin + Support).

---

## 2️⃣ Project Structure (Hybrid Feature + Atomic Design + MUI)


---

## 3️⃣ Features

### Website (Next.js + SEO + Multi-language)
- Landing / Home page
- Browse free & paid books
- Book details → read online / download PDF
- Profile for Users (view/download history, wishlist, reviews)
- Cart & Checkout (Stripe sandbox for Paid books)
- Wishlist / Favorites
- Reviews & Ratings
- Search & Filter books (by category, author, rating)
- Multi-language (EN / AR)
- SEO Optimization: Meta tags, OpenGraph, JSON-LD

### Dashboard (React + TS + MUI) – Staff Only
**Admin + Support**
- Books Management: CRUD Free & Paid books, upload cover & PDF
- Users Management: View users, manage roles
- Orders Management: Track paid/free downloads
- Chat & Notifications: Realtime chat with users
- Analytics: Charts for top books, orders, revenue
- Shortcuts: Quick links to frequent tasks

---

## 4️⃣ Role-Based Access (RBAC)

- Only Staff (Admin + Support) can access Dashboard routes
- Users and Guests **cannot access Dashboard**
- Website routes protected by User role (Profile, Cart, Checkout)
- Dynamic permissions stored in Supabase `user_metadata.role`

| Feature                   | Guest | User | Support | Admin |
|----------------------------|-------|------|---------|-------|
| Browse Books               | ✅    | ✅   | ❌      | ❌    |
| Book Details / Download    | ✅    | ✅   | ❌      | ❌    |
| Profile / Wishlist / Cart  | ❌    | ✅   | ❌      | ❌    |
| Checkout Paid Books        | ❌    | ✅   | ❌      | ❌    |
| Dashboard Home             | ❌    | ❌   | ✅      | ✅    |
| Books Management           | ❌    | ❌   | ✅      | ✅    |
| Users Management           | ❌    | ❌   | ❌      | ✅    |
| Orders Management          | ❌    | ❌   | ✅      | ✅    |
| Chat / Notifications       | ❌    | ❌   | ✅      | ✅    |
| Analytics / Reports        | ❌    | ❌   | ❌      | ✅    |

---

## 5️⃣ Tech Stack

| Layer             | Tech / Tool                                           |
|------------------|-------------------------------------------------------|
| Website Frontend  | Next.js + TypeScript + MUI + Tailwind/Shadcn UI       |
| Dashboard Frontend| React + TypeScript + MUI + Shadcn UI                 |
| State Management  | React Query (server state) + optional Redux          |
| Forms & Validation| React Hook Form + Zod                                 |
| Multi-language    | next-i18next / react-intl                             |
| Backend / BaaS    | Supabase Free Tier (Auth, DB, Realtime, Storage)     |
| Payment           | Stripe sandbox (Paid books)                           |
| Charts / Analytics| Recharts / Chart.js                                   |
| SEO               | Next SEO + JSON-LD                                    |
| Testing           | Jest + React Testing Library + MSW                    |
| Optimization      | Lazy Loading, Memoization, Code Splitting, Image Optimization |

---

## 6️⃣ Development Roadmap

1. **Setup Project**
   - Next.js + React + TypeScript
   - MUI + Tailwind
   - Supabase project → Auth + DB + Storage

2. **Implement Auth & RBAC**
   - Guest, User, Support, Admin
   - Protect Dashboard routes → redirect unauthorized
   - Protect website routes → Profile/Cart/Checkout for User only

3. **Build Website**
   - Landing page, Book browsing, Book details
   - Cart & Checkout (Paid + Free books)
   - Profile & Wishlist
   - Multi-language + SEO

4. **Build Dashboard (Staff Only)**
   - Books, Users, Orders management
   - Chat & Notifications
   - Analytics & Shortcuts

5. **Testing**
   - Unit tests (Components)
   - Integration tests (API calls / React Query / Forms)

6. **Optimization**
   - Lazy loading, memo, code splitting
   - Optimize images & PDFs

7. **Deployment**
   - Website + Dashboard → Vercel
   - Supabase Free Tier → Backend


-- =====================================================
-- EXTENSIONS
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- GUESTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- =====================================================
-- PROFILES (RBAC)
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user','support','admin')),
    created_at TIMESTAMP DEFAULT now()
);

-- Auto-create profile
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO profiles (id, role)
    VALUES (NEW.id, 'user');
    RETURN NEW;
END;
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
        CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW
        EXECUTE FUNCTION handle_new_user();
    END IF;
END;
$$;

-- =====================================================
-- CATEGORIES
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- =====================================================
-- AUTHORS
-- =====================================================
CREATE TABLE IF NOT EXISTS authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    bio_en TEXT,
    bio_ar TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- =====================================================
-- TAGS
-- =====================================================
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    UNIQUE(name_en)
);

-- =====================================================
-- BOOKS
-- =====================================================
CREATE TABLE IF NOT EXISTS books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    slug TEXT UNIQUE,
    description_en TEXT,
    description_ar TEXT,
    category_id UUID REFERENCES categories(id),
    cover_url TEXT,
    pdf_url TEXT,
    price NUMERIC DEFAULT 0,
    is_free BOOLEAN DEFAULT TRUE,
    rating NUMERIC DEFAULT 0,
    created_at TIMESTAMP DEFAULT now()
);

-- BOOK-AUTHORS relation
CREATE TABLE IF NOT EXISTS book_authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
    UNIQUE(book_id, author_id)
);

-- BOOK-TAGS relation
CREATE TABLE IF NOT EXISTS book_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(book_id, tag_id)
);

-- =====================================================
-- BANNERS
-- =====================================================
CREATE TABLE IF NOT EXISTS banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT,
    title_ar TEXT,
    subtitle_en TEXT,
    subtitle_ar TEXT,
    image_url TEXT,
    link TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    position INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT now()
);

-- =====================================================
-- WISHLIST (User + Guest)
-- =====================================================
CREATE TABLE IF NOT EXISTS wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT now(),
    UNIQUE(user_id, guest_id, book_id),
    CHECK (user_id IS NOT NULL OR guest_id IS NOT NULL)
);

-- =====================================================
-- CART (User + Guest)
-- =====================================================
CREATE TABLE IF NOT EXISTS carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    guest_id UUID REFERENCES guests(id),
    created_at TIMESTAMP DEFAULT now(),
    CHECK (user_id IS NOT NULL OR guest_id IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(id),
    quantity INT DEFAULT 1
);

-- =====================================================
-- ADDRESSES (User only)
-- =====================================================
CREATE TABLE IF NOT EXISTS addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    street_address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    postal_code TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- =====================================================
-- ORDERS
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    guest_id UUID REFERENCES guests(id),
    total NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT now(),
    CHECK (user_id IS NOT NULL OR guest_id IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(id),
    price NUMERIC DEFAULT 0,
    quantity INT DEFAULT 1
);

-- =====================================================
-- DOWNLOADS
-- =====================================================
CREATE TABLE IF NOT EXISTS downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    book_id UUID REFERENCES books(id),
    created_at TIMESTAMP DEFAULT now()
);

-- =====================================================
-- REVIEWS
-- =====================================================
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    book_id UUID REFERENCES books(id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT now(),
    UNIQUE(user_id, book_id)
);

-- =====================================================
-- CHAT
-- =====================================================
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    support_id UUID REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES profiles(id),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now()
);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    title TEXT,
    message TEXT,
    type TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now()
);

CREATE OR REPLACE FUNCTION notify_new_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE target uuid;
BEGIN
    SELECT user_id INTO target FROM conversations WHERE id = NEW.conversation_id;
    INSERT INTO notifications(user_id, title, message, type)
    VALUES(target, 'New Message', NEW.message, 'chat');
    RETURN NEW;
END;
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'message_notify_trigger') THEN
        CREATE TRIGGER message_notify_trigger
        AFTER INSERT ON messages
        FOR EACH ROW
        EXECUTE FUNCTION notify_new_message();
    END IF;
END;
$$;

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_guest ON orders(guest_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_guest ON wishlist(guest_id);
CREATE INDEX IF NOT EXISTS idx_cart_user ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_guest ON carts(guest_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_downloads_user ON downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_addresses_user ON addresses(user_id);

-- =====================================================
-- RBAC HELPER
-- =====================================================
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT
LANGUAGE SQL
STABLE
AS $$
  SELECT role FROM profiles WHERE id = auth.uid()
$$;

-- =====================================================
-- ENABLE RLS
-- =====================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES (DROP + CREATE)
-- =====================================================

-- PUBLIC READ
DROP POLICY IF EXISTS "Public read books" ON books;
CREATE POLICY "Public read books" ON books FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read authors" ON authors;
CREATE POLICY "Public read authors" ON authors FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read tags" ON tags;
CREATE POLICY "Public read tags" ON tags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read categories" ON categories;
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read banners" ON banners;
CREATE POLICY "Public read banners" ON banners FOR SELECT USING (true);

-- USER / GUEST POLICIES
DROP POLICY IF EXISTS "User or Guest manage wishlist" ON wishlist;
CREATE POLICY "User or Guest manage wishlist"
ON wishlist FOR ALL
USING (auth.uid() = user_id OR guest_id = current_setting('request.guest_token', true)::uuid);

DROP POLICY IF EXISTS "User or Guest manage cart" ON carts;
CREATE POLICY "User or Guest manage cart"
ON carts FOR ALL
USING (auth.uid() = user_id OR guest_id = current_setting('request.guest_token', true)::uuid);

DROP POLICY IF EXISTS "User or Guest manage cart items" ON cart_items;
CREATE POLICY "User or Guest manage cart items"
ON cart_items FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM carts
        WHERE carts.id = cart_items.cart_id
        AND (auth.uid() = user_id OR guest_id = current_setting('request.guest_token', true)::uuid)
    )
);

DROP POLICY IF EXISTS "User manage reviews" ON reviews;
CREATE POLICY "User manage reviews" ON reviews FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "User manage downloads" ON downloads;
CREATE POLICY "User manage downloads" ON downloads FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "User manage notifications" ON notifications;
CREATE POLICY "User manage notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "User manage own profile" ON profiles;
CREATE POLICY "User manage own profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "User addresses access" ON addresses;
CREATE POLICY "User addresses access" ON addresses FOR ALL USING (auth.uid() = user_id);

-- STAFF POLICIES
DROP POLICY IF EXISTS "Staff manage books" ON books;
CREATE POLICY "Staff manage books" ON books FOR ALL USING (get_user_role() IN ('support','admin'));

DROP POLICY IF EXISTS "Staff manage authors" ON authors;
CREATE POLICY "Staff manage authors" ON authors FOR ALL USING (get_user_role() IN ('support','admin'));

DROP POLICY IF EXISTS "Staff manage banners" ON banners;
CREATE POLICY "Staff manage banners" ON banners FOR ALL USING (get_user_role() IN ('support','admin'));

-- ADMIN ONLY
DROP POLICY IF EXISTS "Admin full profiles access" ON profiles;
CREATE POLICY "Admin full profiles access" ON profiles FOR ALL USING (get_user_role() = 'admin');

-- CHAT POLICIES
DROP POLICY IF EXISTS "Users view conversations" ON conversations;
CREATE POLICY "Users view conversations" ON conversations FOR SELECT
USING (auth.uid() = user_id OR auth.uid() = support_id);

DROP POLICY IF EXISTS "Users send messages" ON messages;
CREATE POLICY "Users send messages" ON messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Users view messages" ON messages;
CREATE POLICY "Users view messages" ON messages FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM conversations
        WHERE conversations.id = messages.conversation_id
        AND (conversations.user_id = auth.uid() OR conversations.support_id = auth.uid())
    )
);
