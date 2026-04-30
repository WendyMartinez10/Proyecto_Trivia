export default function SelectCustom({ value, onChange, options }) {
  return (
    <select
      className="form-select w-50 mx-auto my-3"
      value={value}
      onChange={onChange}
    >
      {options.map((op, i) => (
        <option key={i} value={op.value}>
          {op.label}
        </option>
      ))}
    </select>
  );
}