import type { TaskItem } from '../types/Task';
import { TaskCard } from './TaskCard';

type ColumnProps = {
  title: string;
  tasks: TaskItem[];
  status: number;
  onStatusChange: (taskId: number, newStatus: number) => void;
  onDelete: (taskId: number) => void;
};

export function Column({ title, tasks, status, onStatusChange, onDelete }: ColumnProps) {
  const filteredTasks = tasks.filter(task => task.status === status);

  const getTopBorderColor = () => {
    switch (status) {
      case 0: return '#3b82f6';  // blue-500
      case 1: return '#f59e0b';  // amber-500
      case 2: return '#10b981';  // emerald-500
      default: return '#6b7280';  // gray-500
    }
  };

  return (
    <div 
      className="rounded-sm bg-white border-x border-b border-gray-200"
      style={{ borderTop: `4px solid ${getTopBorderColor()}` }}
    >
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center" style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-semibold text-white">
          {filteredTasks.length}
        </span>
      </div>
      
      <div className="py-4 px-4 space-y-4 min-h-32 md:min-h-64">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No tasks</p>
        ) : (
          filteredTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
