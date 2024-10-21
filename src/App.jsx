// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './LandingPage';
import ChatApp from './ChatApp';
import JobListing from './components/JobListing';
import JobFitChecker from './components/JobFitChecker';
import HelperBot from './components/HelperBot';
import './App.css'; // Optional: Import any global CSS

const App = () => {
    const [isBotOpen, setIsBotOpen] = useState(false); // State to control chat box visibility

    // Function to toggle the chat box
    const toggleBot = () => {
        setIsBotOpen((prev) => !prev);
    };

    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/chat" element={<ChatApp />} />
                    <Route path="/job-fit-checker" element={<JobFitChecker />} />
                    <Route path="/job-listing" element={<JobListing />} />
                </Routes>
                {/* Floating chat icon */}
                <div className="chat-icon" onClick={toggleBot}>
                    💬 {/* You can replace this emoji with an icon or image */}
                </div>
                {/* Render the HelperBot component */}
                {isBotOpen && <HelperBot />}
            </div>
        </Router>
    );
};

export default App;
