const TaskCard = ({ task }) => {
  const date = new Date(task.due_date);
  const formatted = date.toLocaleDateString();

  return (
    <div className="mb-2 rounded border bg-white px-3 py-2 text-sm shadow-sm">
      <h4 className="font-semibold">{task.title}</h4>
      {task.description && (
        <p className="mt-1 text-xs text-gray-600 line-clamp-2">
          {task.description}
        </p>
      )}
      <p className="mt-1 text-xs text-gray-500">Due: {formatted}</p>
    </div>
  );
};

export default TaskCard;
