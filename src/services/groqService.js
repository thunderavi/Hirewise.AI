// src/services/groqService.js
import Groq from "groq-sdk";

// Access the VITE_ prefixed environment variable directly
const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true, // Enable this option with caution
});

export const getGroqChatCompletion = async (messageContent) => {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: messageContent,
            },
        ],
        model: "llama3-8b-8192",
    });

    return chatCompletion.choices[0]?.message?.content || "No response from the model.";
};
