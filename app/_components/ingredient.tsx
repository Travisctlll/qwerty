"use client";
import { useState } from "react";
import { Gemini } from "../icon/gemini";
import { Pepper } from "../icon/pepper";
import { Refresh } from "../icon/refresh";

export const Ingredient = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!inputText) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();

      if (!data.ingredients || data.ingredients.length === 0) {
        setResult("No ingredients detected");
        return;
      }

      setResult(data.ingredients.join(", "));
    } catch (err) {
      console.error(err);
      setResult("Error detecting ingredients");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setInputText("");
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto mt-7 flex flex-col gap-6 p-4 ">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Gemini />
          <p className="font-black text-lg">Ingredient recognition</p>
        </div>
        <button
          className="w-12 h-12 border flex items-center justify-center cursor-pointer rounded-xl"
          onClick={handleRefresh}
        >
          <Refresh />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[#71717A] text-sm">
          Enter a dish name, and AI will detect the ingredients.
        </p>
        <input
          type="text"
          placeholder="food"
          className="w-full h-[124px] border rounded-[10px] px-2"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="h-10 w-24 border rounded-[10px] cursor-pointer"
            onClick={handleGenerate}
          >
            {loading ? "Detecting..." : "Generate"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <Pepper />
          <p className="font-black text-lg">Identified Ingredients</p>
        </div>
        <p className="text-[#71717A] text-sm">
          Enter a dish name to get its ingredients.
        </p>
        {result && <p className="text-[#111] font-semibold mt-2">{result}</p>}
      </div>
    </div>
  );
};
