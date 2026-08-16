"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem } from "@/store/slices/cart-slice";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [imgSrc, setImgSrc] = useState(product.image || "/assets/images/placeholder.svg");

  // Find quantity already in cart (string comparison for safe matching)
  const itemInCart = cartItems.find((i) => String(i.id) === String(product.id));
  const qtyInCart = itemInCart ? itemInCart.qty : 0;

  // Calculate dynamic remaining stock
  const remainingStock = Math.max(0, product.stock - qtyInCart);

  const handleAddToCart = () => {
    if (remainingStock <= 0) return;
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="flex flex-col justify-between border rounded-2xl p-5 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
      <div>
        <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800/80 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            onError={() => setImgSrc("/assets/images/placeholder.svg")}
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex items-center justify-between mb-2 gap-2">
          <span className="text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold">
            {product.category || "General"}
          </span>

          {/* Dynamic Stock Badges */}
          {remainingStock === 0 && (
            <span className="inline-flex items-center gap-1.5 bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-red-200 dark:border-red-800">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Out of Stock
            </span>
          )}

          {remainingStock > 0 && remainingStock < 5 && (
            <span className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-200 dark:border-amber-800">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Low Stock ({remainingStock})
            </span>
          )}
        </div>

        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
          {product.name}
        </h3>
        <p className="text-xl font-extrabold mt-1 text-purple-700 dark:text-purple-400">
          ${product.price.toFixed(2)}
        </p>
      </div>

      <button
        disabled={remainingStock === 0}
        onClick={handleAddToCart}
        className={`mt-5 w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm active:scale-[0.98] ${
          remainingStock === 0
            ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed shadow-none"
            : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/10 hover:shadow-purple-500/20"
        }`}
      >
        {remainingStock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
