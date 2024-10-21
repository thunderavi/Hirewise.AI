import React, { useState } from 'react';
import Groq from 'groq-sdk';
import './ChatApp.css'; // Import the CSS file for styling

const groq = new Groq({ apiKey: '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', dangerouslyAllowBrowser: true });

const ChatApp = () => {
    const [userInput, setUserInput] = useState('');
    const [aiResponse, setAiResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAiResponse('Loading...');

        // Prepare the message for the AI
        const prompt = `Based on the following job description, please provide interview preparation tips in sections: ${userInput}`;

        try {
            const response = await groq.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: 'llama3-8b-8192',
            });

            setAiResponse(formatResponse(response.choices[0]?.message?.content || 'No response'));
        } catch (error) {
            console.error('Error:', error);
            setAiResponse('Error fetching response.');
        }
    };

    // Function to format response into sections
    const formatResponse = (response) => {
        const sections = response.split('\n\n'); // Assuming double newlines separate sections
        return sections.map((section, index) => (
            <div key={index} className="response-section">
                <p>{section}</p>
            </div>
        ));
    };

    return (
        <div className="chat-app">
            <h1 className="chat-title">Interview Preparation Chatbot</h1>
            <form onSubmit={handleSubmit} className="input-form">
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type the job description here..."
                    required
                    className="input-textarea"
                    rows="6" // Adjust rows as needed
                />
                <button type="submit" className="send-button">Get Tips</button>
            </form>
            <div className="response-container">
                <h2>Response:</h2>
                <div className="ai-response">{aiResponse}</div>
            </div>
        </div>
    );
};

export default ChatApp;
