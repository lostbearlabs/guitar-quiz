import React from 'react';
import './App.css'
import Home from "./Home.jsx";
import TriadQuiz from "./TriadQuiz.jsx";
import NoteQuiz from "./NoteQuiz.jsx";
import ScaleDemo from "./ScaleDemo.jsx";
import { HashRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';

function RouteLogger() {
    const location = useLocation();

    React.useEffect(() => {
        // console.log("React Router location changed:", location);
    }, [location]);

    return null; // This component doesn't render anything.
}

const App = () => {
    return (
        <Router>
            <RouteLogger />
            <div>
                {/* Navigation Bar */}
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/note">Notes</Link>
                    <Link to="/triad">Triads</Link>
                    <Link to="scale">Scales</Link>
                </nav>

                {/* Page Content */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/triad" element={<TriadQuiz />} />
                    <Route path="/note" element={<NoteQuiz />} />
                    <Route path="/scale" element={<ScaleDemo />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>

                <div className='footer'>
                    Guitar Quiz Copyright © 2024-2025 Eric R. Johnson
                </div>
            </div>
        </Router>
    );
};

export default App
