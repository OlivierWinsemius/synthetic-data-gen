export const Select = ({ value, setValue, options }) => {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="bg-slate-700 text-white text-center rounded-md mx-2 px-4 h-8"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
