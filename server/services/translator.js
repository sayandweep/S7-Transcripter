import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function translateToEnglish(text) {
  if (!text?.trim()) return "";

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `You are a professional translator.
  
  Translate the user's text into natural English.
  
  Rules:
  - Always output ONLY English.
  - Never output Hindi or any other language.
  - Do not explain.
  - Do not summarize.
  - Do not answer the user's question.
  - Do not add extra information.
  - Return only the translated English text.`,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return response.choices[0].message.content.trim();
}