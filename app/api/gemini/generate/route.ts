import { GoogleGenAI } from "@google/genai";
import { NextResponse, NextRequest } from "next/server";

const apiKey = process.env.GEMINI_KEY;
const ai = new GoogleGenAI({ apiKey });

export const POST = async (request: NextRequest) => {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "хоолны нэр оруул" }, { status: 400 });
    }

    console.log("API KEY:", apiKey ? "OK" : "MISSING");

    const prompt = `I will give you now food name or detailed information what i want it ingridients to make this food. food: “${text}” `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const raw = response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";

    let ingredients: string[];
    try {
      ingredients = JSON.parse(raw);
    } catch {
      ingredients = [raw];
    }

    return NextResponse.json({ ingredients });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
};
