"use client";
import { useState } from "react";
import { Gemini } from "../icon/gemini";
import { Pepper } from "../icon/pepper";
import { Refresh } from "../icon/refresh";

export const Analysis = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("https://huggingface.co/docs", {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_HF_API_KEY",
        },
        body: formData,
      });

      const data = await res.json();

      const label = data?.[0]?.label || "naa cn ajillahgv";
      setResult(label);
    } catch (err) {
      console.error(err);
      setResult("zurag ajillahgv");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-7 flex flex-col gap-6 p-4 ">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Gemini />
          <p className="font-black text-lg">Image analysis</p>
        </div>
        <button className="w-12 h-12 border flex items-center justify-center cursor-pointer rounded-xl">
          <Refresh />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[#71717A] text-sm">
          Upload a food photo, and AI will detect the ingredients.
        </p>
        <input
          type="file"
          className="w-full h-10 border rounded-[10px] px-2"
          accept="image"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="w-full h-auto rounded-lg mt-2"
          />
        )}
        <div className="flex justify-end">
          <button
            className="h-10 w-24 border rounded-[10px] cursor-pointer "
            onClick={handleUpload}
          >
            {loading ? "Recognizing..." : "Generate"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <Pepper />
          <p className="font-black text-lg">Here is the summary</p>
        </div>
        <p className="text-[#71717A] text-sm">
          First, upload your image to recognize the ingredients.
        </p>
        {result && <p className="text-[#111] font-semibold mt-2">{result}</p>}
      </div>
    </div>
  );
};
