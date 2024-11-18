import React from 'react';
import './App.css'
import Home from "./Home.jsx";
import TriadQuiz from "./TriadQuiz.jsx";
import NoteQuiz from "./NoteQuiz.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
    return (
        <Router basename="/guitar-quiz">
            <div>
                {/* Navigation Bar */}
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/note">Notes</Link>
                    <Link to="/triad">Triads</Link>
                </nav>

                {/* Page Content */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/triad" element={<TriadQuiz />} />
                    <Route path="/note" element={<NoteQuiz />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App
