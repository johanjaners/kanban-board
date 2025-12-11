import { useEffect, useState } from 'react';
import { api, type TaskItem } from '../services/api';
import { TaskCard } from '../components/TaskCard';

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
                  <div className="text-sm font-medium text-gray-900 break-words">{task.title}</div>
                  {task.description && (
                    <div className="text-sm text-gray-500 break-words">{task.description}</div>
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
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No tasks found
          </div>
        )}
      </div>
    </div>
  );
}
