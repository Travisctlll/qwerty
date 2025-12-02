import { Gemini } from "../icon/gemini";
import { Pepper } from "../icon/pepper";
import { Refresh } from "../icon/refresh";

export const Ingredient = () => {
  return (
    <div className="max-w-md mx-auto mt-7 flex flex-col gap-6 p-4 ">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Gemini />
          <p className="font-black text-lg">Ingredient recognition</p>
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
          className="w-full h-[124px] border rounded-[10px] px-2"
          placeholder="dentify ingredients"
        />
        <div className="flex justify-end">
          <button className="h-10 w-24 border rounded-[10px] cursor-pointer ">
            Generate
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <Pepper />
          <p className="font-black text-lg">Identified Ingredients</p>
        </div>
        <p className="text-[#71717A] text-sm">
          First, enter your text to recognize an ingredients.
        </p>
      </div>
    </div>
  );
};
