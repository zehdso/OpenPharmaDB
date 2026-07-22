interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="mb-8">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by product, title, or regulator..."
        className="w-full rounded-2xl px-5 py-4 outline-none transition-all duration-200"
        style={{
          background: "var(--surface)",
          color: "var(--text)",
          boxShadow: "var(--shadow-inset)",
          border: "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow =
            "var(--shadow-inset), 0 0 0 2px color-mix(in srgb, var(--accent) 20%, transparent)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow =
            "var(--shadow-inset)";
        }}
      />
    </div>
  );
}
