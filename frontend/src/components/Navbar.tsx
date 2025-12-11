import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-white shadow-md mb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-18">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Kanban
            </Link>
            <Link 
              to="/tasks" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Tasks
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
