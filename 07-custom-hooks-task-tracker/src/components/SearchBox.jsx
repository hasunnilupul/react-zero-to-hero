export default function SearchBox({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="search" className="visually-hidden">Search tasks</label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks"
      />
    </div>
  );
}
