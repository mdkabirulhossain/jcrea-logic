import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome to JCrea Logic Store
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
          Your premier destination for high-quality electronics and tech accessories.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition-all"
          >
            Go to Dashboard ➔
          </a>
          <a
            href="/login"
            className="px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
          >
            Login
          </a>
        </div>
      </div>
      <Toaster position="top-right" />
    </main>
  );
}
