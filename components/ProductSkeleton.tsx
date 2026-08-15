export default function ProductSkeleton() {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-5 animate-pulse space-y-4">
      <div className="h-40 rounded-xl bg-zinc-200 dark:bg-zinc-800 w-full" />
      <div className="h-4 rounded bg-zinc-200 dark:bg-zinc-800 w-1/3" />
      <div className="h-5 rounded bg-zinc-200 dark:bg-zinc-800 w-3/4" />
      <div className="h-6 rounded bg-zinc-200 dark:bg-zinc-800 w-1/4" />
      <div className="h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 w-full mt-2" />
    </div>
  );
}
