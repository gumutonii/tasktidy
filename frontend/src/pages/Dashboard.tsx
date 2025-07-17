import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';

type Task = {
  _id: string;
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

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, {
        title,
        description,
        dueDate,
        completed: false,
      });
      setTasks([...tasks, res.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      const res = await axios.put(`${API_URL}/${id}`, {
        completed: !task.completed,
      });
      setTasks(
        tasks.map((t) => (t._id === id ? res.data : t))
      );
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
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
            key={task._id}
            task={{
              ...task,
              id: task._id // to support the expected `id` prop in TaskCard
            }}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
