
import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

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

export default function MessagesPage() {
  // const [activeChat, setActiveChat] = useState(null);
  // const [isChatOpen, setIsChatOpen] = useState(false);
  const [conversations, setConversations] = useState(null);
  const {authUser} = useAuthContext();

  useEffect(() => {
    async function fetchUserConversations() {
      const response = await fetch('/api/chat/conversation/all');
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        return
      }

      setConversations(result);
    }

    fetchUserConversations();
  }, [])

  const members = conversations?.map((convo) => {
    const participants = convo.conversation;
    const extracted = participants.find((member) => member._id !== authUser.userID);
    return {convoID: convo._id, ...extracted};
  })

  const openChat = (chat) => {
    console.log(chat);
    // setActiveChat(chat);
    // setActiveChat(true);
    // setIsChatOpen(true);
  };

  // const closeChat = () => {
  //   setIsChatOpen(false);
  // };

  if (!conversations) return <h1>Loading</h1>
  if (conversations.length < 1) return <h1>No Conversations started yet</h1>

  return (
    <div className="h-screen bg-neutral-50 relative overflow-hidden md:flex">
      {/* LEFT PANEL (CHAT LIST) */}
      <div
        className={`absolute md:static inset-0 w-full md:w-[360px] bg-white border-r flex flex-col
        transition-transform duration-300 ease-in-out `}
      >
        {/* Header */}
        <div className="p-4 border-b border-primary border-dotted">
          <h2 className="text-lg font-semibold text-[#570DF8]">Messages</h2>
        </div>

        {/* Search */}
        <div className="p-3 bg-base-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats"
              className="w-full rounded-lg border border-primary px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto mt-1">
          {members.map((member) => (
            
            <Link to={`/chat/conversation/${member.convoID}`}
              key={member._id}
              className="px-4 py-3 cursor-pointer border-b border-primary hover:bg-gray-50 block"
            >

              <div className="flex items-center gap-3">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS Navbar component"
                    src={member.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                </div>
            </div>
                <p className="font-medium text-sm">{member.username}</p>
                {/* <span className="text-xs text-gray-400">{chat.time}</span> */}
              </div>
              {/* <p className="text-xs text-gray-500 truncate">
                {chat.lastMessage}
              </p> */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
