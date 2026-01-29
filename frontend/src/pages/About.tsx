export function About() {
  return (
    <div>

    <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-18 pb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">About This Project</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <section>
          <p className="text-gray-700 leading-relaxed font-medium">
            Full-stack Kanban application demonstrating user-scoped data isolation and automated cloud deployment. 
            Built to validate end-to-end integration across a distributed architecture.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tech Stack & Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Backend Core</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>.NET 9 Web API</li>
                <li>Entity Framework Core</li>
                <li>PostgreSQL</li>
                <li>Repository Pattern</li>
                <li>JWT-based Data Isolation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Frontend & UX</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>React / TypeScript / Vite</li>
                <li>Tailwind CSS</li>
                <li>Clerk Auth Integration</li>
                <li>React Router</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Infrastructure & DevOps</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>CI/CD:</strong> GitHub Actions automated pipelines</li>
            <li><strong>Cloud:</strong> Azure App Service & Static Web Apps</li>
            <li><strong>Persistence:</strong> Managed Neon PostgreSQL</li>
          </ul>
        </section>

        <section className="pt-4 border-t border-gray-200">
          <p className="text-gray-600 italic text-sm">
            Developed during Hack Week at School of Applied Technology (SALT)
          </p>
        </section>
      </div>
    </div>

    </div>

  );
}
