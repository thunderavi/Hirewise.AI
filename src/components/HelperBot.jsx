import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Groq from 'groq-sdk';
import './helperBot.css';  // Ensure you have this CSS file for styling

// Initialize Groq with your API key
const groq = new Groq({
    apiKey: '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', // Replace with your actual Groq API key
    dangerouslyAllowBrowser: true
});

// Fake responses for testing
const fakeResponses = {
    "hi": "Hello! How can I assist you today?",
    "tell me a joke": "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "explain the importance of fast language models": "Fast language models can significantly improve the user experience by providing quick responses, which is essential for applications that require real-time interaction."
};

const HelperBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [useFakeResponses, setUseFakeResponses] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate
    const [isChatOpen, setIsChatOpen] = useState(false); // Manage chatbox visibility

    const handleSend = async () => {
        const newMessages = [...messages, { from: 'user', text: input }];
        setMessages(newMessages);
        setInput('');  // Clear the input field after submission
        setLoading(true); // Set loading state to true

        // Default bot response
        let botResponse = 'I am not sure how to answer that.';

        // Check for navigation commands
        if (input.toLowerCase().includes('go to')) {
            const page = input.split('go to ')[1]?.trim(); // Get the page name from the input
            if (page) {
                switch (page.toLowerCase()) {
                    case 'home':
                        navigate('/'); // Navigate to Home
                        botResponse = 'Navigating to the Home page.';
                        break;
                    case 'job listing':
                        navigate('/job-listing'); // Navigate to Job Listing
                        botResponse = 'Navigating to the Job Listing page.';
                        break;
                    case 'checker':
                        navigate('/job-fit-checker'); // Navigate to Checker
                        botResponse = 'Navigating to the Job Fit Checker.';
                        break;
                    case 'chat':
                        navigate('/chat'); // Navigate to Chat
                        botResponse = 'Navigating to the Chat page.';
                        break;
                    default:
                        botResponse = `Sorry, I can't navigate to ${page}. Please specify a valid page.`;
                }
            } else {
                botResponse = 'Please specify a page to navigate to.';
            }

            setLoading(false); // Reset loading state
            newMessages.push({ from: 'bot', text: botResponse });
            setMessages(newMessages);
            return; // Exit the function after handling navigation
        }

        // Fetch response from Groq API
        if (useFakeResponses) {
            botResponse = fakeResponses[input.toLowerCase()] || "I'm not sure how to respond to that.";
            setLoading(false); // Reset loading state
        } else {
            try {
                const response = await groq.chat.completions.create({
                    messages: [{ role: 'user', content: input }],
                    model: 'llama3-8b-8192', // Change this to a valid model name
                });

                botResponse = response.choices[0]?.message?.content || 'No response';
            } catch (error) {
                console.error('Error fetching from Groq:', error);
                botResponse = 'Error fetching response. Please try again later.';
            } finally {
                setLoading(false); // Ensure loading state is reset
            }
        }

        // Update messages with bot response
        newMessages.push({ from: 'bot', text: botResponse });
        setMessages(newMessages);
    };

    // Function to toggle chatbox visibility
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div>
            {/* Chat Icon */}
            <div className="chat-icon" onClick={toggleChat}>
                💬 {/* You can use an icon here or any emoji */}
            </div>

            {/* Chatbox */}
            {isChatOpen && (
                <div className="helper-bot-container">
                    <div className="helper-bot-header">
                        Helper Bot
                        <button onClick={toggleChat} className="close-button">X</button> {/* Close Button */}
                    </div>
                    <div className="helper-bot-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.from}`}>
                                {message.text}
                            </div>
                        ))}
                        {loading && <div className="message bot">Loading...</div>} {/* Show loading state */}
                    </div>
                    <div className="helper-bot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me something..."
                            required
                        />
                        <button onClick={handleSend}>Send</button>
                        <label>
                            
                            
                          
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelperBot;
