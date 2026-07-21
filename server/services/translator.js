import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function translateToEnglish(text) {
  if (!text?.trim()) return "";

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are a professional translator. Translate everything into fluent English. Return only the translated text.",
      },
      {
        role: "user",
        content: text,
      },
    ],
    temperature: 0,
  });

  return response.choices[0].message.content.trim();
}