export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={placeholder}
    />
  );
}