import React, { useState } from 'react';
import { getGroqChatCompletion } from '../services/groqService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included

const JobFitChecker = () => {
    const [jobDetails, setJobDetails] = useState('');
    const [resume, setResume] = useState('');
    const [fitEvaluation, setFitEvaluation] = useState('');
    const [loading, setLoading] = useState(false); // New state for loading indicator
    const [error, setError] = useState(''); // New state for error messages

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setResume(event.target.result); // Set resume text
            };
            reader.readAsText(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setFitEvaluation(''); // Reset previous evaluation

        try {
            // Prepare the message for Groq API
            const messageContent = `Evaluate the following job details and resume for a good fit:\nJob Details: ${jobDetails}\nResume: ${resume}`;
            
            // Call the service to get the evaluation
            const evaluation = await getGroqChatCompletion(messageContent);
            
            // Update the state with the evaluation response
            setFitEvaluation(evaluation);
        } catch (error) {
            console.error('Error checking fit:', error);
            setError('An error occurred while evaluating fit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Job Fit Checker</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="jobDetails" className="form-label">Job Details:</label>
                    <textarea
                        id="jobDetails"
                        className="form-control"
                        rows="4"
                        value={jobDetails}
                        onChange={(e) => setJobDetails(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="resume" className="form-label">Resume (TXT file):</label>
                    <input
                        id="resume"
                        type="file"
                        accept=".txt"
                        className="form-control"
                        onChange={handleResumeChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Checking...' : 'Check Fit'}
                </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {fitEvaluation && (
                <div className="mt-4">
                    <h3>Fit Evaluation:</h3>
                    <div className="alert alert-success">
                        <p>{fitEvaluation}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobFitChecker;
