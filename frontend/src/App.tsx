import { useEffect, useState } from 'react';
import { api, type TaskItem } from './services/api';
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
      <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
      <p className="mb-4 text-gray-600">Connected to Azure API ✅</p>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Tasks from API:</h2>
        <pre className="text-sm overflow-auto">{JSON.stringify(tasks, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
