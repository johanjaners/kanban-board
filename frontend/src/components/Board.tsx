import type { TaskItem } from '../services/api';
import { Column } from './Column';

type BoardProps = {
  tasks: TaskItem[];
  onStatusChange: (taskId: number, newStatus: number) => void;
};

export function Board({ tasks, onStatusChange }: BoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Column 
        title="📋 Todo" 
        tasks={tasks} 
        status={0}
        onStatusChange={onStatusChange}
      />
      <Column 
        title="🔄 In Progress" 
        tasks={tasks} 
        status={1}
        onStatusChange={onStatusChange}
      />
      <Column 
        title="✅ Done" 
        tasks={tasks} 
        status={2}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}
