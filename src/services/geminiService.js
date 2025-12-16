import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateSafetySummary = async (zoneName, feedbackList) => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
        console.warn("Gemini API Key missing");
        return "AI Summary unavailable (Missing Key)";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Construct prompt based on feedback
        const feedbackText = feedbackList.map(f =>
            `- Rating: ${f.rating}/5, Tags: ${f.tags.join(', ')}, Comment: ${f.comment || 'None'}`
        ).join('\n');

        const prompt = `
      Analyze the following safety feedback for the area "${zoneName}".
      Generate a neutral, cautious, 2-sentence safety summary for a traveler.
      Do not use alarmist language. Focus on "perceived risk" and "community feedback".
      
      Feedback:
      ${feedbackText}
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini AI Error:", error);
        return "Unable to generate summary at this time.";
    }
};
