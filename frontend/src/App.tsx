import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { TaskList } from "./pages/TaskList";
import { About } from "./pages/About";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 min-w-80">
            <main>
                {/* IF SIGNED OUT: Show Clerk's Sign-In Component */}
                <SignedOut>
                    <div className="flex justify-center items-center h-[80vh]">
                        <SignIn />
                    </div>
                </SignedOut>

                {/* IF SIGNED IN: Show Application */}
                <SignedIn>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tasks" element={<TaskList />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </SignedIn>
            </main>
        </div>
    );
}

export default App;
