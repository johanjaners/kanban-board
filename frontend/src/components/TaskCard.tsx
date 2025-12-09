import type { TaskItem } from '../services/api';

type TaskCardProps = {
  task: TaskItem;
  onStatusChange: (taskId: number, newStatus: number) => void;
  onDelete: (taskId: number) => void;
};

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);
  
  const getPriorityLabel = (priority?: number) => {
    if (!priority) return { text: 'None', color: '#6b7280' };
    if (priority <= 2) return { text: 'Low', color: '#22c55e' };
    if (priority <= 4) return { text: 'Medium', color: '#eab308' };
    return { text: 'High', color: '#ef4444' };
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: return 'border-l-blue-500';
      case 1: return 'border-l-yellow-500';
      case 2: return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('sv-SE');
  };

  const priorityInfo = getPriorityLabel(task.priority);
  
  return (
    <div className={`relative bg-gray-100 border border-gray-200 border-l-4 ${getStatusColor(task.status)} rounded p-4 shadow-md hover:shadow-lg transition-all`}>
      <h3 className="font-semibold text-gray-800 mb-2">{task.title}</h3>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}
      
      <div className="flex gap-2 items-stretch mb-3">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, Number(e.target.value))}
          className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={0}>Todo</option>
          <option value={1}>In Progress</option>
          <option value={2}>Done</option>
        </select>
        
        {task.priority && (
          <span 
            className="px-3 rounded border border-gray-300 bg-white text-gray-800 font-medium text-sm flex items-center"
            style={{ borderLeft: `4px solid ${priorityInfo.color}` }}
          >
            {priorityInfo.text}
          </span>
        )}
      </div>
      
      <div className="flex gap-2 items-center text-xs">{task.dueDate && (
          <span className="text-gray-600">📅 {formatDate(task.dueDate)}</span>
        )}
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500 text-sm transition-colors"
        aria-label="Delete task"
        title="Delete task"
      >
        🗑️
      </button>
    </div>
  );
}
