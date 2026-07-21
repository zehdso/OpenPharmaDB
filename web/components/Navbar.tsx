import Link from "next/link";

const links = [
  { name: "Explore", href: "/explore" },
  { name: "Downloads", href: "/downloads" },
  { name: "API", href: "/api" },
  { name: "GitHub", href: "https://github.com" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-blue-600"
        >
          OpenPharmaDB
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100">
          Search
        </button>
      </div>
    </header>
  );
}
