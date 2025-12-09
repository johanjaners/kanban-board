import type { TaskItem } from '../services/api';

type TaskCardProps = {
  task: TaskItem;
  onStatusChange: (taskId: number, newStatus: number) => void;
  onDelete: (taskId: number) => void;
};

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const getPriorityColor = (priority?: number) => {
    if (!priority) return 'bg-gray-100';
    if (priority <= 2) return 'bg-green-100';
    if (priority <= 4) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const formatDate = (date?: string) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('sv-SE');
  };

  return (
    <div className={`p-4 rounded-lg shadow-sm border border-gray-200 ${getPriorityColor(task.priority)}`}>
      <h3 className="font-semibold text-gray-800 mb-2">{task.title}</h3>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}
      
      <div className="mb-3">
        <label className="text-xs text-gray-600 block mb-1">Status:</label>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, Number(e.target.value))}
          className="w-full text-sm border border-gray-300 rounded px-2 py-1 bg-white"
        >
          <option value={0}>📋 Todo</option>
          <option value={1}>🔄 In Progress</option>
          <option value={2}>✅ Done</option>
        </select>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        {task.priority && (
          <span className="font-medium">Priority: {task.priority}</span>
        )}
        {task.dueDate && (
          <span>Due: {formatDate(task.dueDate)}</span>
        )}
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="mt-3 w-full text-sm text-red-600 hover:text-red-800 hover:bg-red-50 py-1 px-2 rounded transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
