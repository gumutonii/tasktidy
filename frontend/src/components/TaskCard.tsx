type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
};

type Props = {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

function TaskCard({ task, onToggleComplete, onDelete }: Props) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p><strong>Due:</strong> {task.dueDate}</p>
      <div className="task-actions">
        <button onClick={() => onToggleComplete(task.id)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
