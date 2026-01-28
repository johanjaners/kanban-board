import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { TaskItem } from '../types/Task';
import { Board } from '../components/Board';
import { TaskForm } from '../components/TaskForm';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

export function Home() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchTasks = async () => {
    setLoading(true);

    const token = await getToken();
    if (!token) return;

    api.getTasks(token)
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleStatusChange = async (taskId: number, newStatus: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      const token = await getToken();
      if (!token) return;

      await api.updateTask(token, taskId, {
        title: task.title,
        description: task.description,
        status: newStatus,
        priority: task.priority,
        dueDate: task.dueDate,
      });
      
      fetchTasks();
      toast.success('Task status updated!');
    } catch (error) {
      console.error('Failed to update task status:', error);
      toast.error('Failed to update task status');
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      const token = await getToken();
      if (!token) return;

      await api.deleteTask(token, taskId);
      fetchTasks();
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-18 pb-8">
      <div className="flex justify-between items-center mb-8 pb-4" style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.1)' }}>
        <h1 className="text-4xl font-bold text-gray-800">Kanban Board</h1>
        <TaskForm onTaskCreated={fetchTasks} />
      </div>

      <Board 
        tasks={tasks} 
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
