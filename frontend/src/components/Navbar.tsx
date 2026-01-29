import { UserButton } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";

export function Navbar() {
    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "text-blue-600 font-semibold underline decoration-blue-600 decoration-2 underline-offset-8"
            : "text-gray-700 font-semibold hover:text-blue-600 hover:underline hover:decoration-blue-600 hover:decoration-2 hover:underline-offset-8";

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
                    <div className="flex items-center">
                        <UserButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}
