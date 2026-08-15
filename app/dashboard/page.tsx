"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import ProductSkeleton from "@/components/ProductSkeleton";
import Navbar from "@/components/Navbar";
import { toast, Toaster } from "sonner";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const fetchProducts = async () => {
    setError(false);
    setProducts(null);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error();
      setProducts(await res.json());
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Navbar />
      <Toaster position="top-right" />

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
          Featured Products
        </h1>

        {error ? (
          <div className="p-12 text-center">
            <p className="text-red-500 font-semibold text-lg">
              Something went wrong loading products.
            </p>
            <button
              onClick={fetchProducts}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              Retry Loading
            </button>
          </div>
        ) : !products ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 dark:text-zinc-400 font-medium">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex flex-col justify-between border rounded-2xl p-5 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all"
              >
                <div>
                  <div className="h-40 w-full bg-zinc-100 dark:bg-zinc-800/80 rounded-xl mb-4 flex items-center justify-center text-4xl">
                    📦
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-bold">
                      {p.category || "General"}
                    </span>
                    {p.stock === 0 && (
                      <span className="bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
                        Out of Stock
                      </span>
                    )}
                    {p.stock > 0 && p.stock < 5 && (
                      <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
                        Low Stock ({p.stock})
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                    {p.name}
                  </h3>
                  <p className="text-xl font-extrabold mt-1 text-purple-700 dark:text-purple-400">
                    ${p.price.toFixed(2)}
                  </p>
                </div>

                <button
                  disabled={p.stock === 0}
                  onClick={() => {
                    addItem(p);
                    toast.success(`${p.name} added to cart`);
                  }}
                  className="mt-5 w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm active:scale-[0.98] bg-purple-600 hover:bg-purple-700 text-white disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
