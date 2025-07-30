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

  // Get API URL from environment or construct from current location
  const getApiUrl = () => {
    // Try to get from Vite environment variable first
    const viteApiUrl = import.meta.env.VITE_API_URL;
    if (viteApiUrl) {
      return viteApiUrl;
    }
    
    // If not available, construct from current location
    const currentOrigin = window.location.origin;
    if (currentOrigin.includes('azurewebsites.net')) {
      // For Azure deployment, construct backend URL
      const frontendHostname = window.location.hostname;
      const backendHostname = frontendHostname.replace('frontend', 'backend');
      return `https://${backendHostname}/api/tasks`;
    }
    
    // Fallback to localhost
    return 'http://localhost:5000/api/tasks';
  };

  const API_URL = getApiUrl();

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log('🔍 Fetching tasks from:', API_URL);
        const res = await axios.get(API_URL);
        console.log('✅ Tasks fetched successfully:', res.data);
        setTasks(res.data);
      } catch (err: any) {
        console.error('❌ Failed to fetch tasks:', err);
        console.error('🔍 Error details:', {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          url: API_URL
        });
      }
    };
    
    fetchTasks();
  }, [API_URL]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('📝 Adding task:', { title, description, dueDate });
      const res = await axios.post(API_URL, {
        title,
        description,
        dueDate,
        completed: false,
      });
      console.log('✅ Task added successfully:', res.data);
      setTasks([...tasks, res.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (err: any) {
      console.error('❌ Failed to add task:', err);
      console.error('🔍 Error details:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
    }
  };

  const handleToggleComplete = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      console.log('🔄 Toggling task completion:', id);
      const res = await axios.put(`${API_URL}/${id}`, {
        completed: !task.completed,
      });
      console.log('✅ Task updated successfully:', res.data);
      setTasks(
        tasks.map((t) => (t._id === id ? res.data : t))
      );
    } catch (err: any) {
      console.error('❌ Failed to toggle task:', err);
      console.error('🔍 Error details:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log('🗑️ Deleting task:', id);
      await axios.delete(`${API_URL}/${id}`);
      console.log('✅ Task deleted successfully:', id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err: any) {
      console.error('❌ Failed to delete task:', err);
      console.error('🔍 Error details:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
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
