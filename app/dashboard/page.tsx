"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import ProductSkeleton from "@/components/ProductSkeleton";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    setError(false);
    setProducts(null);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data);
      setError(false);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!ignore) {
          setProducts(data);
          setError(false);
        }
      } catch {
        if (!ignore) {
          setError(true);
        }
      }
    }
    loadData();
    return () => {
      ignore = true;
    };
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
          <div className="p-12 text-center border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 rounded-2xl">
            <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
              Something went wrong loading products.
            </p>
            <button
              onClick={fetchProducts}
              className="mt-4 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-sm transition-all"
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
          <div className="p-12 text-center text-zinc-500 dark:text-zinc-400 font-medium border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
