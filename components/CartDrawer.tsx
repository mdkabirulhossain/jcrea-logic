"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeItem, clearCart } from "@/store/slices/cart-slice";
import CheckoutButton from "./CheckoutButton";
import EmptyState from "./EmptyState";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty ?? 1),
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <h2 className="text-base sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 sm:gap-2">
              <span>🛒 Shopping Cart</span>
              <span className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold shrink-0">
                {cartItems.reduce((acc, i) => acc + (i.qty ?? 1), 0)} items
              </span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <EmptyState
                title="Your Cart is Empty"
                description="Add some products to your cart to start shopping."
              />
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 overflow-hidden shrink-0 flex items-center justify-center">
                      <Image
                        src={item.image || "/assets/images/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        ${item.price} × {item.qty ?? 1}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-purple-600 dark:text-purple-400">
                      ${(item.price * (item.qty ?? 1)).toFixed(2)}
                    </span>
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="text-red-500 hover:text-red-700 text-xs font-bold p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-zinc-900 dark:text-zinc-100">
                <span>Subtotal</span>
                <span className="text-xl text-purple-600 dark:text-purple-400">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <CheckoutButton amount={subtotal} />

              <button
                onClick={() => dispatch(clearCart())}
                className="w-full py-2 text-xs font-semibold text-zinc-500 hover:text-red-600 transition-colors"
              >
                Clear Entire Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
