# JCrea Logic — E-Commerce Dashboard

This application built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **NextAuth.js v5**, and **Redux Toolkit + Redux Persist** with a custom Zustand-style selector hook.

---

## 🔗 Project Links

- **Live Demo URL:** [https://jcrea-logic.vercel.app](https://jcrea-logic.vercel.app) *(Replace with your Vercel deployment link)*


## 🚀 Getting Started & Setup Instructions

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **Package Manager**: `pnpm` (recommended), `npm`, or `yarn`

### 2. Installation
Clone the repository and install project dependencies:

```bash
git clone https://github.com/your-username/jcrea-logic.git
cd jcrea-logic
pnpm install
```

### 3. Generate NextAuth Secret
Generate a secure random string for `NEXTAUTH_SECRET` using OpenSSL:

```bash
openssl rand -base64 32
```
*(Or on Windows PowerShell / Command Prompt without OpenSSL, generate any 32-character random secret string)*

### 4. Configure Environment Variables
Copy `.env.example` to create your local `.env.local` file:

```bash
cp .env.example .env.local
```

Fill in `.env.local` with your values:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
ADMIN_EMAIL=your-admin-email
```

### 5. Run the Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---


### Pillar 2 — Functional Engineering Test

#### A. Authentication & Security
- **Google OAuth Login:** Configured via NextAuth.js v5 with Google Provider on `/login`.
- **Edge Route Protection (`middleware.ts`):** Implemented at the Next.js Edge level:
  - Unauthenticated users attempting to access `/dashboard` or sub-routes are redirected to `/login`.
  - Authenticated users attempting to visit `/login` or the root page `/` are automatically redirected to `/dashboard`.
- **Session Persistence:** Configured using NextAuth JWT strategy (`session: { strategy: "jwt" }`).
- **User Profile & Logout:** Displays user avatar, display name, role badge, and a functional `signOut` button.

#### B. Inventory & State Management
- **Stock Badges & Button States:**
  - `stock = 0`: Displays red **"Out of Stock"** badge & disables Add to Cart button.
  - `0 < stock < 5`: Displays amber **"Low Stock ({remaining})"** badge & enables Add to Cart button.
  - `stock >= 5`: Normal display with no stock badge.
- **Global State & Optimistic UI:**
  - Powered by Redux Toolkit with a custom Zustand-style hook selector (`useCartStore`).
  - Dispatching `addItem(product)` instantly updates the Navbar cart count synchronously without waiting for API responses.
- **Checkout Flow:**
  - Verifies user authentication before starting checkout.
  - Displays loading spinner with simulated 1.5s delay (`await new Promise(r => setTimeout(r, 1500))`).
  - On Success: Displays success toast, clears cart, and redirects to dashboard.
  - On Error: Displays error toast with a **"Retry"** option.

#### C. Polish & UX
- **Skeleton Loaders:** Grid of 6 skeleton cards (`ProductSkeleton`) rendered while products fetch.
- **Error Handling & Retry:** User-friendly error card with a working **"Retry Loading"** button that re-triggers data fetching.
- **Toast Notifications:** Powered by `sonner` for crisp error and success feedback.
- **Empty States:** Custom empty state UI when cart or product list is empty.

---

## 🏆 Bonus Challenges Completed

1. **Edge Middleware (`middleware.ts`):** Edge-level route protection handling `/dashboard` protection and authenticated user redirects.
2. **Role-Based Access Control (RBAC):**
   - Role (`admin` | `manager`) is assigned dynamically via `process.env.ADMIN_EMAIL`.
   - Admin accounts display a dedicated purple **Admin** badge in the Navbar, while Manager accounts see the **Manager** badge.
3. **Performance — Code Splitting (`next/dynamic`):**
   - Dynamically lazy-loads heavy components (such as `CartDrawer`) using `next/dynamic` with `{ ssr: false }` to reduce initial JavaScript bundle size and improve Lighthouse performance scores.
4. **Cart Persistence (`localStorage`):**
   - Configured `redux-persist` with web storage and `<PersistGate>` hydration so cart state survives page refreshes.

---

## 🧠 Tech Decisions: Redux Toolkit + Redux Persist vs. Zustand

- **Why Redux Toolkit + Redux Persist?**
  - **Rehydration & Storage Safety:** `redux-persist` handles web storage synchronization, SSR rehydration fallbacks, and action serializability checks out of the box.
  - **Developer Ergonomics:** Created a custom wrapper hook (`useCartStore`) around Redux dispatch and selectors to offer the clean, minimalist developer experience of Zustand while keeping the robustness of Redux Toolkit.

---