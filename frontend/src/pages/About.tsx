export function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-18 pb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">About This Project</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is this?</h2>
          <p className="text-gray-700 leading-relaxed">
            This is a Kanban board application that helps you organize and track tasks through different stages of completion. 
            Move tasks between "To Do", "In Progress", and "Done" columns to visualize your workflow and stay productive.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Frontend</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>React with TypeScript</li>
                <li>Vite</li>
                <li>Tailwind CSS</li>
                <li>React Router</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Backend</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>.NET 9 Web API</li>
                <li>Entity Framework Core</li>
                <li>PostgreSQL (Neon)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Create and delete tasks</li>
            <li>Change task status with dropdown</li>
            <li>Priority levels (Low, Medium, High)</li>
            <li>Due date tracking</li>
            <li>Responsive design for mobile and desktop</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Deployment</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Frontend: Azure Static Web Apps</li>
            <li>Backend: Azure App Service</li>
            <li>Database: Neon PostgreSQL</li>
            <li>CI/CD: GitHub Actions</li>
          </ul>
        </section>

        <section className="pt-4 border-t border-gray-200">
          <p className="text-gray-600 italic">
            Built during Hack Week at School of Applied Technology (Salt)
          </p>
        </section>
      </div>
    </div>
  );
}
