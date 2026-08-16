"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart-store";
import dynamic from "next/dynamic";

const CartDrawer = dynamic(() => import("./CartDrawer"), {
  ssr: false,
});

export default function Navbar() {
  const { data: session } = useSession();
  const count = useCartStore((s) => s.totalCount());
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm">
        <a href="/dashboard" className="flex items-center gap-3">
          <span className="text-xl font-extrabold tracking-tight bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            <span className="sm:hidden">JL</span>
            <span className="hidden sm:inline">JCrea Logic</span>
          </span>
        </a>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Cart Count Badge / Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold text-sm border border-purple-200 dark:border-purple-800 hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors cursor-pointer"
          >
            <span>🛒</span>
            <span>{count}</span>
          </button>

          {/* Role Badge (RBAC) */}
          {session?.user?.role && (
            <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${
              session.user.role === "admin"
                ? "text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 border-purple-300 dark:border-purple-700"
                : "text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
            }`}>
              {session.user.role === "admin" ? "Admin" : "Manager"}
            </span>
          )}

          {/* User Avatar & Name */}
          {session?.user ? (
            <div className="flex items-center gap-3">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border border-zinc-300 dark:border-zinc-700 object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                  {session.user.name?.[0] || "U"}
                </div>
              )}
              <span className="text-sm font-medium hidden sm:inline text-zinc-800 dark:text-zinc-200">
                {session.user.name}
              </span>
              <button
                onClick={() => signOut({ redirectTo: "/login" })}
                className="px-3.5 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors shadow-sm"
            >
              Sign In
            </a>
          )}
        </div>
      </nav>

      {/* Slide-over Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
