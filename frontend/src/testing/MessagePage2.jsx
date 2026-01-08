
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

export default function MessagesPage2s() {
  const [activeChat, setActiveChat] = useState(chatList[0]);

  return (
    <div className="h-screen flex bg-neutral-50">
      {/* LEFT PANEL */}
      <div className="w-full md:w-[360px] border-r bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats"
              className="w-full rounded-lg border px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chatList.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`px-4 py-3 cursor-pointer border-b transition ${
                activeChat.id === chat.id
                  ? "bg-purple-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">{chat.name}</p>
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {chat.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="hidden md:flex flex-col flex-1">
        {/* Chat Header */}
        <div className="px-5 py-4 border-b bg-white">
          <p className="font-medium">{activeChat.name}</p>
          <span className="text-xs text-green-500">Online</span>
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
        <div className="px-4 py-3 border-t bg-white">
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
      </div>
    </div>
  );
}
