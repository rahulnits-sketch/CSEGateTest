import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08090b] text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* GATE Subjects */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">GATE Subjects</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li><Link href="/tests/dbms" className="hover:text-white transition">DBMS</Link></li>
              <li><Link href="/tests/os" className="hover:text-white transition">Operating Systems</Link></li>
              <li><Link href="/tests/cn" className="hover:text-white transition">Computer Networks</Link></li>
              <li><Link href="/tests/dsa" className="hover:text-white transition">Data Structures & Algo</Link></li>
              <li><Link href="/syllabus" className="hover:text-white text-blue-400 transition">GATE Full Syllabus 📜</Link></li>
            </ul>
          </div>

          {/* Placement & DSA */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Placement & DSA</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li><Link href="/placement/aptitude" className="hover:text-white transition">Quantitative Aptitude</Link></li>
              <li><Link href="/placement/reasoning" className="hover:text-white transition">Logical Reasoning</Link></li>
              <li><Link href="/placement/verbal" className="hover:text-white transition">Verbal Ability</Link></li>
              <li><Link href="/dsa" className="hover:text-white transition">DSA </Link></li>
              <li><Link href="/general" className="hover:text-white transition">Live Quiz 🌐</Link></li>
            </ul>
          </div>

          {/* Contact Support Section */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Contact & Support</h4>
            <div className="mt-3 space-y-2 text-xs">
              <p className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:9708915535" className="text-blue-400 hover:underline font-mono">
                  +91 9708915535
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>💬</span>
                <a
                  href="https://wa.me/919708915535?text=Hi%2C%20I%20have%20a%20query%20regarding%20CheckMate%20GATE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:rkumarraj733@gmail.com" className="text-purple-400 hover:underline break-all">
                  rkumarraj733@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} CheckMate GATE. Built for engineers & GATE aspirants.
        </div>
      </div>
    </footer>
  );
}
