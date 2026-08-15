import React from "react";

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col space-y-3 p-4 border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900"
        >
          <div className="h-48 w-full bg-gray-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded" />
          <div className="h-8 w-full bg-gray-200 dark:bg-zinc-800 rounded-lg mt-2" />
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
