"use client";
import { Anaheim } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { Analysis } from "./_components/image";
import { Ingredient } from "./_components/ingredient";
import { Chat } from "./icon/chat";
import { Creator } from "./_components/creator";
import { Assisst } from "./_components/chatassisst";

export default function Home() {
  const [tab, setTab] = useState("Image analysis");
  return (
    <>
      <div>
        <div className="w-full h-14 flex items-center">
          <p className="font-black text-2xl ml-12">Ai tools</p>
        </div>
        <div className="flex justify-center ">
          <div className="flex justify-center flex-col">
            <div className="bg-[#f4f4f5]  h-auto w-[500px] rounded-xl px-3 py-1 flex justify-center">
              <button
                onClick={() => setTab("Image analysis")}
                className={`  px-3 py-1 rounded-xl cursor-pointer ${
                  tab === "Image analysis"
                    ? "bg-white"
                    : "bg-transparent text-[#71717A]"
                }`}
              >
                Image analysis
              </button>

              <button
                onClick={() => setTab("Ingredient recognition")}
                className={`px-3 py-1 rounded-xl cursor-pointer ${
                  tab === "Ingredient recognition"
                    ? "bg-white"
                    : "bg-transparent text-[#71717A]"
                }`}
              >
                Ingredient recognition
              </button>
              <button
                onClick={() => setTab("Image creator")}
                className={` px-3 py-1 rounded-xl cursor-pointer ${
                  tab === "Image creator"
                    ? "bg-white"
                    : "bg-transparent text-[#71717A]"
                }`}
              >
                Image creator
              </button>
            </div>
          </div>
        </div>
        {tab === "Image analysis" && <Analysis />}
        {tab === "Ingredient recognition" && <Ingredient />}
        {tab === "Image creator" && <Creator />}
      </div>
      <div className="flex justify-end mt-[500px] mr-[100px]">
        <Assisst />
      </div>
    </>
  );
}
