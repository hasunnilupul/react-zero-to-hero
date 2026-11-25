import TaskItem from './TaskItem.jsx';

export default function TaskList({
  tasks,
  hasTasks,
  isSearching,
  filterLabel,
  onToggle,
  onEdit,
  onDelete,
}) {
  if (tasks.length === 0) {
    let message = 'Nothing here yet. Add your first task above.';
    if (hasTasks && isSearching) message = 'No tasks match your search.';
    else if (hasTasks) message = `No ${filterLabel.toLowerCase()} tasks.`;
    return <p className="empty">{message}</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
