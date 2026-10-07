import Link from "next/link";
import { Check, Mail, MessageCircle, Phone } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/gate", label: "GATE" },
  { href: "/dsa", label: "DSA" },
  { href: "/placement", label: "Placement" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/general", label: "Quiz" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08090b] text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-sm font-extrabold tracking-tight text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20">
            <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
          </span>
          <span>
            CheckMate <span className="text-blue-500">GATE</span>
          </span>
        </Link>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:9708915535"
            aria-label="Call CheckMate GATE"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://wa.me/919708915535?text=Hi%2C%20I%20have%20a%20query%20regarding%20CheckMate%20GATE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with CheckMate GATE on WhatsApp"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="mailto:rkumarraj733@gmail.com"
            aria-label="Email CheckMate GATE"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
