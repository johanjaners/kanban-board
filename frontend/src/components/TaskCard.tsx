import type { TaskItem } from '../services/api';

type TaskCardProps = {
  task: TaskItem;
};

export function TaskCard({ task }: TaskCardProps) {
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
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        {task.priority && (
          <span className="font-medium">Priority: {task.priority}</span>
        )}
        {task.dueDate && (
          <span>Due: {formatDate(task.dueDate)}</span>
        )}
      </div>
    </div>
  );
}
