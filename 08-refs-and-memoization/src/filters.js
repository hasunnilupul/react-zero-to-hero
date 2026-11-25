export const FILTERS = [
  { id: 'all', label: 'All', matches: () => true },
  { id: 'active', label: 'Active', matches: (task) => !task.completed },
  { id: 'completed', label: 'Completed', matches: (task) => task.completed },
];
