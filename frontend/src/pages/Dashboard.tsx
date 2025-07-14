import { useState } from 'react';
import TaskCard from '../components/TaskCard';

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
};

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="dashboard-container">
      <h2>Welcome to TaskTidy</h2>

      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Task Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="date"
          required
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

