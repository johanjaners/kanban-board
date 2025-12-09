import type { TaskItem } from '../services/api';
import { Column } from './Column';

type BoardProps = {
  tasks: TaskItem[];
};

export function Board({ tasks }: BoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Column title="📋 Todo" tasks={tasks} status={0} />
      <Column title="🔄 In Progress" tasks={tasks} status={1} />
      <Column title="✅ Done" tasks={tasks} status={2} />
    </div>
  );
}
