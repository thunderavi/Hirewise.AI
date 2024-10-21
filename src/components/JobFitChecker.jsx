import React, { useState } from 'react';
import { getGroqChatCompletion } from '../services/groqService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included

const JobFitChecker = () => {
    const [jobDetails, setJobDetails] = useState('');
    const [resume, setResume] = useState('');
    const [fitEvaluation, setFitEvaluation] = useState('');
    const [fitStatus, setFitStatus] = useState(''); // New state for fit status
    const [gaps, setGaps] = useState(''); // New state for identified gaps
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
        setFitEvaluation(''); 
        setFitStatus(''); // Reset previous evaluation
        setGaps(''); // Reset gaps

        try {
            // Prepare the message for Groq API
            const messageContent = `Evaluate the following job details and resume for a good fit and provide a clear conclusion. Include any skill or experience gaps identified:\nJob Details: ${jobDetails}\nResume: ${resume}`;
            
            // Call the service to get the evaluation
            const evaluation = await getGroqChatCompletion(messageContent);
            
            // Format the evaluation response into sections
            const formattedEvaluation = formatResponse(evaluation);
            
            // Analyze the evaluation to determine fit status and gaps
            const status = determineFitStatus(evaluation);
            const identifiedGaps = extractGaps(evaluation); // Extract gaps
            
            // Update the state with formatted evaluation, fit status, and gaps
            setFitEvaluation(formattedEvaluation);
            setFitStatus(status);
            setGaps(identifiedGaps); // Set identified gaps
        } catch (error) {
            console.error('Error checking fit:', error);
            setError('An error occurred while evaluating fit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to format response into sections
    const formatResponse = (response) => {
        const sections = response.split('\n\n'); // Assuming sections are separated by double newlines
        return sections.map((section, index) => (
            <div key={index} className="alert alert-success mt-2">
                <p>{section}</p>
            </div>
        ));
    };

    // Function to determine fit status based on the evaluation text
    const determineFitStatus = (evaluation) => {
        const lowerCaseEval = evaluation.toLowerCase();
        
        if (lowerCaseEval.includes('great fit') || lowerCaseEval.includes('excellent match') || lowerCaseEval.includes('perfect fit')) {
            return 'Higher Chance';
        } else if (lowerCaseEval.includes('good fit') || lowerCaseEval.includes('suitable') || lowerCaseEval.includes('strong match')) {
            return 'Good Fit';
        } else if (lowerCaseEval.includes('not a good fit') || lowerCaseEval.includes('no match') || lowerCaseEval.includes('weak fit')) {
            return 'Not Fit';
        } else {
            return 'Fit Unclear'; // If no clear indicators are found
        }
    };

    // Function to extract identified gaps from the evaluation text
    const extractGaps = (evaluation) => {
        // Assuming the evaluation contains specific statements about gaps
        const gapIndicators = ['gap', 'lack', 'missing', 'not sufficient', 'deficient', 'shortage'];
        const gaps = gapIndicators.filter(gap => evaluation.toLowerCase().includes(gap));

        if (gaps.length > 0) {
            return 'Identified gaps: ' + gaps.join(', ');
        }
        return 'No significant gaps identified.';
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
                    <div>{fitEvaluation}</div>
                    <div className="alert alert-info mt-4">
                        <h4>Fit Status: {fitStatus}</h4>
                        <p>{gaps}</p> {/* Display identified gaps */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobFitChecker;
