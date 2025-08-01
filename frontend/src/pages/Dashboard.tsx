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

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const TASKS_URL = `${API_BASE.replace(/\/$/, '')}/api/tasks`;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(TASKS_URL);
        setTasks(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error('Failed to fetch tasks:', err.response?.data?.message || err.message);
        } else {
          console.error('An unexpected error occurred:', err);
        }
      }
    };
    fetchTasks();
  }, [TASKS_URL]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(TASKS_URL, {
        title,
        description,
        dueDate,
        completed: false,
      });
      setTasks([...tasks, res.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('Failed to add task:', err.response?.data?.message || err.message);
      } else {
        console.error('An unexpected error occurred:', err);
      }
    }
  };

  const handleToggleComplete = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    try {
      const res = await axios.put(`${TASKS_URL}/${id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('Failed to toggle task:', err.response?.data?.message || err.message);
      } else {
        console.error('An unexpected error occurred:', err);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${TASKS_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('Failed to delete task:', err.response?.data?.message || err.message);
      } else {
        console.error('An unexpected error occurred:', err);
      }
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
              id: task._id
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