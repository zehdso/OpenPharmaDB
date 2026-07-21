type RecallCardProps = {
  title: string;
  regulator: string;
  date: string;
  severity: string;
};

const severityStyles: Record<string, string> = {
  "Class I": "bg-red-100 text-red-700",
  "Class II": "bg-amber-100 text-amber-700",
  "Class III": "bg-blue-100 text-blue-700",
};

export default function RecallCard({
  title,
  regulator,
  date,
  severity,
}: RecallCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-2 text-slate-500">
            {regulator} • {date}
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            severityStyles[severity] ?? "bg-slate-100 text-slate-700"
          }`}
        >
          {severity}
        </span>
      </div>
    </article>
  );
}
