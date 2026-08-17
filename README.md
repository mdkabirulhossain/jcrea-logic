# JCrea Logic — Pillar 2: Functional Engineering Test

Production-quality e-commerce dashboard logic built with **Next.js 16 (App Router)**, **TypeScript**, **NextAuth.js v5 (Auth.js)**, **Redux Toolkit + Redux Persist**, and **Tailwind CSS**.

This repository is submitted specifically for **Pillar 2 (Functional Logic Test — 50%)**, focusing on **Authentication & Security**, **Inventory & Global State Management**, **Mock API**, **UX Polish**, and **Bonus Engineering Challenges**.

---

## 🔗 Submission Links

* **Live Demo URL:** [https://jcrea-logic.vercel.app](https://jcrea-logic.vercel.app)
* **GitHub Repository (Pillar 2):** [https://github.com/mdkabirulhossain/jcrea-logic](https://github.com/mdkabirulhossain/jcrea-logic)

---

## ⚙️ Tech Stack & Dependencies

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js v16 (App Router) | App Router, Server Components & Edge API Routes |
| **Language** | Strict TypeScript (`.ts`, `.tsx`) | 100% typed codebase with strict mode (no `any`) |
| **Authentication** | NextAuth.js v5 (`next-auth@5.0.0-beta.32`) | Google OAuth 2.0 Provider & Edge Middleware Integration |
| **State Management** | Redux Toolkit + Redux Persist | Centralized store with Optimistic UI & `localStorage` persistence |
| **Styling & UI** | Tailwind CSS v4 + Sonner | Modern styling and accessible toast notifications |
| **Deployment** | Vercel | Live production deployment with environment configuration |

---

## 🚀 Getting Started & Setup Instructions

### 1. Prerequisites
* **Node.js**: v18.x or higher
* **Package Manager**: `pnpm` (recommended), `npm`, or `yarn`

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/mdkabirulhossain/jcrea-logic.git
cd jcrea-logic
pnpm install
```

### 3. Configure Environment Variables
Copy `.env.example` to create your local `.env.local` file:

```bash
cp .env.example .env.local
```

Populate `.env.local` with the following variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=ZNJltGm6mydeTK3/m4meLncKp0TLIQkw/bdBpKEa3r8=
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
ADMIN_EMAIL=kabirulhossainj@gmail.com
```

> **🔑 Google Cloud Console OAuth Setup:**  
> In your Google OAuth 2.0 Client credentials:
> * **Authorised JavaScript origins:**  
>   `http://localhost:3000`, `https://jcrea-logic.vercel.app`
> * **Authorised redirect URIs:**  
>   `http://localhost:3000/api/auth/callback/google`, `https://jcrea-logic.vercel.app/api/auth/callback/google`

### 4. Run Development Server

```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to test locally.

---

## 📋 Pillar 2 Logic Implementation Details

### A. Authentication & Security
1. **Google OAuth Login:** Configured using NextAuth.js v5 with Google Provider on the `/login` page (`signIn("google")`).
2. **Edge Route Protection (`middleware.ts`):** 
   * Protects `/dashboard` and all sub-routes at the Next.js Edge level, redirecting unauthenticated users to `/login`.
   * Automatically redirects authenticated users away from `/login` or `/` straight to `/dashboard`.
3. **Session Persistence:** Configured using NextAuth JWT strategy (`session: { strategy: "jwt" }`) so user sessions survive reloads.
4. **User Profile & Logout:** Navbar renders the user's avatar, display name, RBAC badge, and a functional `signOut` button.

### B. Inventory & State Management
1. **Stock Badge & Button Logic:**
   * **`stock = 0`:** Displays red **"Out of Stock"** badge; disables the "Add to Cart" button.
   * **`0 < stock < 5`:** Displays amber **"Low Stock ({remaining})"** badge; button enabled.
   * **`stock >= 5`:** Normal display with no stock badge.
2. **Global State & Optimistic UI:**
   * Built with Redux Toolkit and wrapped in a custom hook (`useCartStore`) for clean consumption.
   * Dispatching `addItem(product)` instantly updates the Navbar cart count synchronously (Optimistic UI without waiting for network responses).
3. **Checkout Flow:**
   * **Session Check:** Verifies user authentication; redirects unauthenticated users to `/login`.
   * **Loading State:** Button displays a loading spinner and disabled state during processing.
   * **Latency Simulation:** Simulates network request using `await new Promise(r => setTimeout(r, 1500))`.
   * **Success:** Triggers a success toast notification via `sonner`, clears the cart, and redirects to `/dashboard`.
   * **Failure:** Triggers an error toast with an interactive **"Retry"** action button.

### C. Polish & UX
* **Skeleton Loaders:** Renders 6 skeleton cards (`ProductSkeleton`) while fetching products from `/api/products`.
* **Error Handling & Retry:** Renders a user-friendly error card with a working **"Retry Loading"** button.
* **Toast Feedback:** Implemented `sonner` toasts for success and error state communication.
* **Empty State:** Custom empty state UI when the product list or cart drawer is empty.

---

## 🏆 Bonus Challenges Completed

1. **Edge Middleware (`middleware.ts`):** Edge-level route protection using NextAuth `auth()` handler.
2. **Role-Based Access Control (RBAC):**
   * Configured `jwt` and `session` callbacks in `auth.ts` to assign `role: 'admin' | 'manager'` based on `ADMIN_EMAIL`.
   * Renders a purple **Admin** badge for administrators and a neutral **Manager** badge for managers in the Navbar.
3. **Performance — Code Splitting (`next/dynamic`):**
   * Dynamically imports heavy client components (such as `CartDrawer`) using `next/dynamic` with `{ ssr: false }` to reduce initial bundle size.
4. **Cart Persistence (`localStorage`):**
   * Persists cart state across reloads using `redux-persist` and `<PersistGate>` hydration.

---

## 🧠 Tech Decisions

### Why Redux Toolkit + Redux Persist?
* **Robust Persistence & Hydration:** `redux-persist` provides out-of-the-box local storage persistence with SSR rehydration protection and action serializability checks.
* **Zustand-Style Ergonomics:** We wrapped Redux selectors/dispatches in a custom `useCartStore` hook to provide the clean developer experience of Zustand with the strict state management guarantees of Redux Toolkit.

### Why NextAuth.js v5 (Auth.js)?
NextAuth v5 allows seamless integration with Next.js App Router and Edge Middleware (`middleware.ts`), guaranteeing lightweight, edge-compatible authentication.

---

## 📌 Known Limitations & Configuration Notes

1. **OAuth Callback Requirements:** Google OAuth requires exact registration of `http://localhost:3000/api/auth/callback/google` (dev) and `https://jcrea-logic.vercel.app/api/auth/callback/google` (prod) in Google Cloud Console.
2. **Google OAuth Testing Mode:** If the Google OAuth Consent Screen is in "Testing" mode, Google limits logins strictly to listed "Test users".