export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center">
      <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
        Trusted pharmaceutical recall database
      </span>

      <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
        Global Pharmaceutical
        <br />
        Safety Database
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
        Search official medicine recalls from trusted regulators worldwide.
        Fast, searchable, and always up to date.
      </p>

      <div className="mx-auto mt-10 max-w-3xl">
        <input
          type="text"
          placeholder="Search medicines, manufacturers, recalls..."
          className="w-full rounded-2xl border border-slate-300 bg-white px-6 py-4 text-lg shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>
    </section>
  );
}
