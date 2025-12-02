import { useState } from "react";
import { Chat } from "../icon/chat";

export const Assisst = () => {
  const [click, setClick] = useState(false);
  return (
    <div>
      <button
        className="bg-black flex justify-center items-center rounded-3xl w-12 h-12 cursor-pointer"
        onClick={() => setClick(true)}
      >
        <Chat />
      </button>
      {click && <div className="fixed inset-0">ewrhiulhogeqhofoih</div>}
    </div>
  );
};
