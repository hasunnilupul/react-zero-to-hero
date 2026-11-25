// In React 19, `ref` is an ordinary prop on function components. No forwardRef needed.
export default function SearchBox({ value, onChange, ref }) {
  return (
    <div className="search">
      <label htmlFor="search" className="visually-hidden">Search tasks</label>
      <input
        id="search"
        ref={ref}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks (press / to focus)"
      />
    </div>
  );
}
