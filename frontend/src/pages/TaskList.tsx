import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { TaskItem } from '../types/Task';
import { TaskCard } from '../components/TaskCard';
import { EditTaskModal } from '../components/EditTaskModal';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

const statusNames = ['To Do', 'In Progress', 'Done'];

const getPriorityLabel = (priority?: number) => {
  if (!priority) return { text: 'Low', color: 'bg-green-100 text-green-800' };
  if (priority <= 2) return { text: 'Low', color: 'bg-green-100 text-green-800' };
  if (priority <= 4) return { text: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
  return { text: 'High', color: 'bg-red-100 text-red-800' };
};

export function TaskList() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
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

  const handleEdit = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask(task);
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">All Tasks</h1>
      
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Priority
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900 wrap-break-word">{task.title}</div>
                  {task.description && (
                    <div className="text-sm text-gray-500 wrap-break-word">{task.description}</div>
                  )}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {statusNames[task.status]}
                  </span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityLabel(task.priority).color}`}>
                    {getPriorityLabel(task.priority).text}
                  </span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {tasks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No tasks found
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No tasks found
          </div>
        )}
      </div>

      <EditTaskModal
        task={editingTask}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onTaskUpdated={fetchTasks}
      />
    </div>
  );
}
