// src/components/NavBar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AuthModal from './AuthModal'; // Import the AuthModal component

const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Chat App</NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/chat">Chat</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/job-fit-checker">CV Analyzer</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/job-listing">Job Listings</NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn" onClick={() => setIsModalOpen(true)}>Login/Register</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Render AuthModal if it is open */}
            {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default NavBar;
