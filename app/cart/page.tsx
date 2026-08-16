"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import CheckoutButton from "@/components/CheckoutButton";
import EmptyState from "@/components/EmptyState";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeItem, clearCart } from "@/store/slices/cart-slice";
import { Toaster } from "sonner";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty ?? 1),
    0
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Navbar />
      <Toaster position="top-right" />

      <main className="max-w-4xl mx-auto p-6 md:p-8">
        <h1 className="text-2xl font-extrabold mb-6">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <EmptyState
            title="Your Cart is Empty"
            description="Explore our products and add them to your cart."
            actionText="Browse Products"
            onAction={() => (window.location.href = "/dashboard")}
          />
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-5 border rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 rounded-xl bg-purple-100 dark:bg-purple-950/60 overflow-hidden shrink-0 flex items-center justify-center">
                      <Image
                        src={item.image || "/assets/images/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        Category: {item.category || "General"}
                      </p>
                      <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-1">
                        ${item.price} × {item.qty ?? 1}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">
                      ${(item.price * (item.qty ?? 1)).toFixed(2)}
                    </span>
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal & Checkout Section */}
            <div className="p-6 border rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-2xl text-purple-600 dark:text-purple-400 font-extrabold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <CheckoutButton amount={subtotal} />

              <button
                onClick={() => dispatch(clearCart())}
                className="w-full text-center text-xs text-zinc-500 hover:text-red-600 transition-colors font-medium py-1"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
