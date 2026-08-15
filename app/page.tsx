import Navbar from "@/components/Navbar";
import Dashboard from "./dashboard/page";
import { Toaster } from "sonner";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Navbar />
      <Dashboard />
      <Toaster position="top-right" />
    </main>
  );
}
