import TaskItem from './TaskItem';

function emptyMessage(filterId, totalCount) {
  if (totalCount === 0) return 'No tasks yet. Add your first one above.';
  if (filterId === 'active') return 'Nothing left to do. Nice work!';
  return 'No completed tasks yet.';
}

export default function TaskList({ tasks, totalCount, filterId, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">{emptyMessage(filterId, totalCount)}</p>;
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
