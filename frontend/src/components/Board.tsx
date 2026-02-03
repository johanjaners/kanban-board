import type { TaskItem } from '../types/Task';
import { Column } from './Column';

type BoardProps = {
  tasks: TaskItem[];
  onStatusChange: (taskId: number, newStatus: number) => void;
  onDelete: (taskId: number) => void;
  onEdit: (taskId: number) => void;
};

export function Board({ tasks, onStatusChange, onDelete, onEdit }: BoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
      <Column 
        title="To Do"
        tasks={tasks} 
        status={0}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Column 
        title="In Progress"
        tasks={tasks} 
        status={1}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <Column 
        title="Done"
        tasks={tasks} 
        status={2}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}