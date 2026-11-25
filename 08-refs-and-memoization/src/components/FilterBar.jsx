import { FILTERS } from '../filters.js';

export default function FilterBar({ tasks, filterId, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          aria-pressed={filter.id === filterId}
          onClick={() => onChange(filter.id)}
        >
          {filter.label} ({tasks.filter(filter.matches).length})
        </button>
      ))}
    </div>
  );
}
