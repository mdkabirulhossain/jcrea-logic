"use client";

import { Product } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/slices/cart-slice";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <div className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      <div>
        <div className="h-44 w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-4 flex items-center justify-center text-4xl">
          📦
        </div>
        <span className="text-xs uppercase tracking-wider text-purple-600 font-semibold">
          {product.category}
        </span>
        <h3 className="font-bold text-lg mt-1 text-zinc-900 dark:text-zinc-100">
          {product.name}
        </h3>
        <p className="text-xl font-extrabold mt-2 text-zinc-900 dark:text-zinc-100">
          ${product.price}
        </p>
      </div>

      <button
        onClick={() => dispatch(addItem(product))}
        disabled={product.stock === 0}
        className={`mt-4 w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors ${
          product.stock === 0
            ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700 active:scale-[0.99]"
        }`}
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
