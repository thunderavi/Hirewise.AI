import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-title">HireWise</h1>
                <p className="hero-description">
                    Your intelligent solution to streamline the hiring process with cutting-edge AI.
                </p>
                <a href="#start-chat" className="start-chat-button">
                    Get Started
                </a>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>AI-Powered Resume Screening</h3>
                        <p>Filter thousands of resumes in seconds, focusing on the most qualified candidates for your job openings.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Smart Job Matching</h3>
                        <p>Match candidates to the right job positions quickly and effectively using our AI technology.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Automated Interview Scheduling</h3>
                        <p>Manage interviews with ease, thanks to our automated scheduling system, saving your team valuable time.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Candidate Engagement Chatbot</h3>
                        <p>Engage with candidates 24/7 using our chatbot, ensuring prompt communication and efficient query handling.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Interview Preparation Assistance</h3>
                        <p>Prepare candidates with personalized interview questions, enhancing their readiness and improving the success rate.</p>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="call-to-action-section">
                <h2>Ready to Supercharge Your Hiring?</h2>
                <p>Start using HireWise today and experience a new era of efficient, intelligent recruitment.</p>
                <a href="#start-free-trial" className="start-chat-button">
                    Start Your Free Trial
                </a>
            </section>
        </div>
    );
};

export default LandingPage;
