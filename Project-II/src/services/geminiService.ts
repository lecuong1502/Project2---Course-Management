import { GoogleGenerativeAI, type GenerateContentRequest, type Part } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are "EduBot", a professional and friendly consultant for the One Life, One Future EduCenter.
Your goal is to help potential students choose the right course.
We offer:
1. English for Beginners (Online) - A1 Level - $150
2. Intermediate English (Offline) - B1 Level - $200 - Requires placement test.
3. IELTS Preparation (Offline) - B2+ Level - $300 - Intensive.
4. Japanese N5 (Online) - N5 Level - $180.

Rules:
- Be polite and encouraging.
- Ask about their current level or goals if they are unsure.
- If they ask about Offline classes, mention we have great facilities but classes need min 20 students to start.
- If they ask about Online classes, mention flexibility and min 10 students to start.
- Keep answers concise (under 100 words).
`;

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
});

export const sendMessageToGemini = async (message: string | GenerateContentRequest | (string | Part)[]) => {
    try {
        if (!API_KEY) {
            throw new Error("Chưa cấu hình API Key");
        }

        const result = await model.generateContent(message);
        const response = await result.response;

        return response.text();

    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I'm currently having trouble connecting to the server. Please try again later or contact our hotline.";
    }
};