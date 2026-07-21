import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function translateToEnglish(text) {
  if (!text || text.trim() === "") return "";

  const prompt = `
Translate the following text into natural English.
 
Rules:
- Only return the translated English.
- Do not explain.
- Do not add quotation marks.
- Preserve meaning.

Text:
${text}
`;

const response = await ai.models.generateContent({
  model: "gemini-flash-latest",
  contents: [
    {
      role: "user",
      parts: [{
        text: `Translate the following text to fluent English. Return only the translation.\n\n${text}`
      }]
    }
  ]
});

  return response.text.trim();
}

console.log("Key exists:", !!process.env.GEMINI_API_KEY);
console.log("Key prefix:", process.env.GEMINI_API_KEY?.slice(0, 5));