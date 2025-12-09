import type { TaskItem } from '../services/api';
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

  const getColumnColor = () => {
    switch (status) {
      case 0: return 'bg-blue-50 border-blue-200';
      case 1: return 'bg-yellow-50 border-yellow-200';
      case 2: return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${getColumnColor()}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold">
          {filteredTasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
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
