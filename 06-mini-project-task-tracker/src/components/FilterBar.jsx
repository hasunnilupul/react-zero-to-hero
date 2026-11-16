import { FILTERS } from '../filters';

export default function FilterBar({ tasks, activeId, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          aria-pressed={filter.id === activeId}
          onClick={() => onChange(filter.id)}
        >
          {filter.label} <span className="count">{tasks.filter(filter.matches).length}</span>
        </button>
      ))}
    </div>
  );
}
