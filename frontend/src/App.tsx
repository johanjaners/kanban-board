import { useEffect, useState } from 'react';
import { api, type TaskItem } from './services/api';
import { Board } from './components/Board';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTasks()
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Kanban Board</h1>
        <p className="mb-6 text-gray-600">Connected to Azure API ✅</p>
        
        <Board tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
