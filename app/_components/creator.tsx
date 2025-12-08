import { useState } from "react";
import { Gemini } from "../icon/gemini";
import { PhotoIcon } from "../icon/photoicon";
import { Refresh } from "../icon/refresh";

export const Creator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);

    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data?.image) {
        setImage(`data:image/png;base64,${data.image}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-7 flex flex-col gap-6 p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Gemini />
          <p className="font-black text-lg">Food image creator</p>
        </div>
        <button
          className="w-12 h-12 border flex items-center justify-center cursor-pointer rounded-xl"
          onClick={() => {
            setImage(null);
            setPrompt("");
          }}
        >
          <Refresh />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[#71717A] text-sm">
          What food image do you want? Describe it briefly.
        </p>
        <textarea
          className="w-full h-[124px] border rounded-[10px] px-2"
          placeholder="Food description"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="h-10 w-24 border rounded-[10px] cursor-pointer"
            onClick={handleGenerate}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <PhotoIcon />
          <p className="font-black text-lg">Result</p>
        </div>
        <p className="text-[#71717A] text-sm">
          First, enter your text to generate an image.
        </p>
        {image && (
          <img src={image} alt="Generated food" className="mt-2 rounded-lg" />
        )}
      </div>
    </div>
  );
};
