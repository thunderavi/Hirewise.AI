// src/components/AuthModal.jsx
import React, { useState } from 'react';
import './authModal.css'; // Create this file for styles

const AuthModal = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false); // New state for admin toggle
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log(isAdmin ? 'Admin logging in with' : 'User logging in with', { email, password });
        onClose(); // Close modal after login
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Add your registration logic here
        console.log(isAdmin ? 'Admin registering with' : 'User registering with', { email, password });
        onClose(); // Close modal after registration
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{isLogin ? (isAdmin ? 'Admin Login' : 'User Login') : (isAdmin ? 'Admin Register' : 'User Register')}</h2>
                
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="input-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    
                    <button type="submit" className="submit-button">
                        {isLogin ? (isAdmin ? 'Admin Login' : 'User Login') : (isAdmin ? 'Admin Register' : 'User Register')}
                    </button>

                    <div className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                    </div>
                </form>

                <div className="toggle-admin">
                    <span onClick={() => setIsAdmin(false)} style={{ cursor: 'pointer', marginRight: '10px' }}>User</span> |
                    <span onClick={() => setIsAdmin(true)} style={{ cursor: 'pointer', marginLeft: '10px' }}>Admin</span>
                </div>

                <button className="close-button" onClick={onClose}>✖</button>
            </div>
        </div>
    );
};

export default AuthModal;
