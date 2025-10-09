import { GoogleGenAI } from "@google/genai";
const instanceGenerator = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });
  return ai;
};
const ai = instanceGenerator();
export default ai;
