interface FilterBarProps {
  regulators: string[];
  classifications: string[];
  countries: string[];

  regulator: string;
  classification: string;
  country: string;

  onRegulatorChange: (value: string) => void;
  onClassificationChange: (value: string) => void;
  onCountryChange: (value: string) => void;
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
      >
        <option value="">All</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function FilterBar(props: FilterBarProps) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <Select
        label="Regulator"
        value={props.regulator}
        options={props.regulators}
        onChange={props.onRegulatorChange}
      />

      <Select
        label="Classification"
        value={props.classification}
        options={props.classifications}
        onChange={props.onClassificationChange}
      />

      <Select
        label="Country"
        value={props.country}
        options={props.countries}
        onChange={props.onCountryChange}
      />
    </div>
  );
}
