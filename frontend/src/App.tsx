import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { TaskList } from "./pages/TaskList";
import { About } from "./pages/About";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 min-w-80">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <main>
                <SignedOut>
                    <div className="flex justify-center items-center h-[80vh]">
                        <SignIn />
                    </div>
                </SignedOut>

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
