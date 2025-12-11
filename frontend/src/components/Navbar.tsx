import { NavLink } from 'react-router-dom';

export function Navbar() {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition-colors pb-1 border-b-2 ${
      isActive
        ? 'text-blue-600 border-blue-600'
        : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-300'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md mb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-18">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <NavLink to="/" className={getLinkClass}>
              Kanban
            </NavLink>
            <NavLink to="/tasks" className={getLinkClass}>
              Tasks
            </NavLink>
            <NavLink to="/about" className={getLinkClass}>
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
