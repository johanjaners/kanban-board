import { useEffect, useState } from 'react';
import { api, type TaskItem } from './services/api';
import { Board } from './components/Board';
import { TaskForm } from './components/TaskForm';
import './App.css';

function App() {
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
      
      // Refresh tasks after update
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
      // Refresh tasks after delete
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      className="
        bg-gray-100 rounded-2xl 
        min-w-[270px] max-w-7xl 
        px-6 md:px-12 lg:px-22
        pt-12 pb-8
      "
    >
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-left">Kanban Board</h1>
        
        <div className="mb-6">
          <TaskForm onTaskCreated={fetchTasks} />
        </div>

        <div className="pb-16 md:pb-64">
          <Board 
            tasks={tasks} 
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        </div>
    </div>
  );  

}

export default App;
