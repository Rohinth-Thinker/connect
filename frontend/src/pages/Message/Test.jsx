
import { useState } from "react";

const chatList = [
  {
    id: 1,
    name: "Arun Kumar",
    lastMessage: "Is this book available?",
    time: "2m",
  },
  {
    id: 2,
    name: "Priya",
    lastMessage: "I’ll buy it tomorrow",
    time: "1h",
  },
];

const chatMessages = [
  { id: 1, text: "Hi", fromMe: false },
  { id: 2, text: "Is this book available?", fromMe: false },
  { id: 3, text: "Yes, it is available", fromMe: true },
];

export default function Test() {
  const [activeChat, setActiveChat] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const openChat = (chat) => {
    console.log(chat);
    // setActiveChat(chat);
    setActiveChat(true);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="h-screen bg-neutral-50 relative overflow-hidden md:flex">
      {/* RIGHT PANEL (CHAT WINDOW) */}
      <div
        className={`absolute md:static inset-0 flex-1 bg-neutral-50 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isChatOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
      >
        {activeChat && (
          <>
            {/* Chat Header */}
            <div className="px-5 py-4 border-b bg-white flex items-center gap-3">
              {/* Back button (mobile only) */}
              <button
                className="md:hidden text-lg"
                onClick={closeChat}
              >
                ←
              </button>

              <div>
                <p className="font-medium">{activeChat.name}</p>
                <span className="text-xs text-green-500">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
                    msg.fromMe
                      ? "ml-auto bg-purple-600 text-white"
                      : "mr-auto bg-white border"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="px-4 py-3 border-t bg-white fixed bottom-0 w-full">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700">
                  Send
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
