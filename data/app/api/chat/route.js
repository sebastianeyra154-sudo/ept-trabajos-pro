import { GoogleGenAI } from "@google/generative-ai";
import { podcastsIndie } from "@/data/podcasts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  const { message } = await req.json();
  const infoPodcasts = podcastsIndie.map(p => `- [${p.titulo}](${p.url}): ${p.descripcion}`).join("\n");

  const systemInstruction = `
    Eres un asistente IA experto en producción audiovisual indie. 
    Tu objetivo es ayudar a los usuarios con dudas básicas de video, audio y edición.
    SIEMPRE recomienda uno o varios de los siguientes podcasts, compartiendo su link exacto:https://www.youtube.com/playlist?list=PLJhPvAIGR1jiF3zmwgLvgkdRnsh9QRRiu&jct=-oFvmrPvjGCpl8-_al4z3g
  `;

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction });
    const result = await model.generateContent(message);
    return new Response(JSON.stringify({ text: result.response.text() }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
