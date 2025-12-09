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

  const getHeaderColor = () => {
    switch (status) {
      case 0: return 'bg-blue-700';
      case 1: return 'bg-yellow-700';
      case 2: return 'bg-green-700';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className="rounded-lg bg-gray-300">
      <div className={`${getHeaderColor()} rounded-t-lg px-4 py-3 flex justify-between items-center`}>
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold text-white">
          {filteredTasks.length}
        </span>
      </div>
      
      <div className="p-4 space-y-3">
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
