"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/store/slices/cart-slice";
import { toast } from "sonner";

interface CheckoutButtonProps {
  amount: number;
  disabled?: boolean;
}

export function CheckoutButton({ amount, disabled = false }: CheckoutButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    // 1. Verify session - redirect to /login if unauthenticated
    if (status === "unauthenticated" || !session) {
      toast.error("Please sign in to complete your checkout.");
      router.push("/login");
      return;
    }

    if (disabled || loading) return;

    // 2. Show loading state on button
    setLoading(true);

    try {
      // 3. Simulate await new Promise(r => setTimeout(r, 1500))
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 4. Success -> show success toast + clear cart
      toast.success(`Checkout successful! Total paid: $${amount.toFixed(2)}`);
      dispatch(clearCart());
      router.push("/dashboard");
    } catch (error) {
      // 5. Failure -> show error toast with "Retry" option
      toast.error("Checkout failed. Please try again.", {
        action: {
          label: "Retry",
          onClick: () => handleCheckout(),
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || loading}
      className={`w-full py-3.5 px-6 rounded-xl font-bold text-white shadow-md transition-all duration-200 flex items-center justify-center gap-2 ${
        disabled || loading
          ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none"
          : "bg-purple-600 hover:bg-purple-700 active:scale-[0.99] shadow-purple-500/20"
      }`}
    >
      {loading ? (
        <>
          <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Processing Checkout...
        </>
      ) : (
        `Checkout ($${amount.toFixed(2)})`
      )}
    </button>
  );
}

export default CheckoutButton;
