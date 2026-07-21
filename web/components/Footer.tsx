export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row">
        <p>© 2026 OpenPharmaDB</p>

        <div className="flex gap-6">
          <a href="#">API</a>
          <a href="#">Downloads</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
