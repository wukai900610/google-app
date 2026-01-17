
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function recognizeFood(base64Image: string) {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image,
          },
        },
        {
          text: "Identify the food in this image. Provide nutritional estimates. Be realistic about portion sizes. Return ONLY valid JSON.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          protein: { type: Type.NUMBER, description: "grams of protein" },
          carbs: { type: Type.NUMBER, description: "grams of carbs" },
          fats: { type: Type.NUMBER, description: "grams of fat" },
          weight: { type: Type.NUMBER, description: "estimated weight in grams" },
          confidence: { type: Type.NUMBER, description: "percentage confidence (0-100)" },
          isFood: { type: Type.BOOLEAN, description: "whether the image actually contains food" }
        },
        required: ["name", "calories", "protein", "carbs", "fats", "weight", "confidence", "isFood"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || "{}");
    return data;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Recognition failed");
  }
}
