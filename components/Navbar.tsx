import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight text-zinc-950">
          GATE CSE Test Series
        </Link>
        <Link href="/tests" className="text-sm font-medium text-zinc-600 hover:text-zinc-950">
          Tests
        </Link>
      </nav>
    </header>
  );
}