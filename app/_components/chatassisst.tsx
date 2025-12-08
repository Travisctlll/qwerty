import { useState } from "react";
import { Chat } from "../icon/chat";
import { Delete } from "../icon/delete";
import { IoIosSend } from "react-icons/io";

export const Assisst = () => {
  const [click, setClick] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, `You: ${message}`]);

    const userMessage = message;
    setMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat: userMessage }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setMessages((prev) => [...prev, `AI: ${data.text}`]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, "AI: Failed to get response"]);
    }
  };

  return (
    <div className="relative">
      <button
        className="bg-black flex justify-center items-center rounded-3xl w-12 h-12 cursor-pointer z-20 relative"
        onClick={() => setClick(true)}
      >
        <Chat />
      </button>

      {click && (
        <div className="w-[380px] h-[472px] border rounded-xl absolute bottom-14 right-0 bg-white flex flex-col justify-between p-2 z-10">
          <div className="flex justify-between border rounded-xl p-2">
            <p>Chat assistant</p>
            <button
              className="border w-[38px] h-[38px] rounded-xl flex justify-center items-center"
              onClick={() => setClick(false)}
            >
              <Delete />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="bg-gray-200 p-2 rounded-xl max-w-[80%] ml-auto"
              >
                {msg}
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-1">
            <input
              className="w-[300px] h-10 border rounded-xl px-2"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="border w-10 h-10 flex justify-center items-center rounded-3xl bg-black"
              onClick={handleSend}
              disabled={loading}
            >
              <IoIosSend color="white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
