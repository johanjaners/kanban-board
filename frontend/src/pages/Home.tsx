import { useEffect, useState } from 'react';
import { api, type TaskItem } from '../services/api';
import { Board } from '../components/Board';
import { TaskForm } from '../components/TaskForm';

export function Home() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    setLoading(true);
    api.getTasks()
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleStatusChange = async (taskId: number, newStatus: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      await api.updateTask(taskId, {
        title: task.title,
        description: task.description,
        status: newStatus,
        priority: task.priority,
        dueDate: task.dueDate,
      });
      
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task status:', error);
      alert('Failed to update task status');
    }
  };

  const handleDelete = async (taskId: number) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await api.deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task');
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
