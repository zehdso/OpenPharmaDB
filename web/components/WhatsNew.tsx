const updates = [
  "3 new recalls added today",
  "FDA dataset refreshed",
  "Health Canada dataset refreshed",
  "Database synchronized successfully",
];

export default function WhatsNew() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            What's New
          </h2>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Live
          </span>
        </div>

        <div className="space-y-4">
          {updates.map((update) => (
            <div
              key={update}
              className="rounded-xl bg-slate-50 px-4 py-3"
            >
              {update}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
