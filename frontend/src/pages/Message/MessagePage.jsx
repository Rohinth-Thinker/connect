
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Home/components/Footer";

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

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const [isSearchedFocused, setIsSearchedFocused] = useState(false);

  const [userResults, setUserResults] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const lastElementRef = useRef(null);

  const navigate = useNavigate();

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

  useEffect(() => {
    setUserResults([]);
    setPage(1);
    setHasMore(false);
  }, [searchText])

  useEffect(() => {
    const controller = new AbortController();

    const debounceTimeout = setTimeout(() => {

    async function fetchUsers() {
      try {
        const response = await fetch(`/api/profile/fetch/profiles?q=${searchText}&page=${page}&limit=5`, {
          signal: controller.signal,
        });
        const result = await response.json();
        
        if (!response.ok) return;

        setUserResults((prev) => [...prev, ...result.profiles]);
        console.log(result.hasMore);
        setHasMore(() => result.hasMore);
      } catch(err) {
        console.log(err);
      }
    }

    if (searchText) fetchUsers();
    else setUserResults([]);

    }, 300);

    return () => {
      controller.abort();
      clearTimeout(debounceTimeout);
    }
  }, [searchText, page])

  useEffect(() => {
    if (!lastElementRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (hasMore) {
          console.log(true);
          setPage((prev) => prev + 1);
        }
      }
    }, {threshold: 0.5})

    observer.observe(lastElementRef.current);

    return () => {
      observer.disconnect();
    }
  }, [hasMore])

  console.log(hasMore, page);
  const members = conversations?.map((convo) => {
    const participants = convo.conversation;
    const extracted = participants.find((member) => member._id !== authUser.userID);
    return {convoID: convo._id, ...extracted};
  })

  function handleTextChange(e) {
    setSearchText(e.target.value);
  }

  async function handleMessageClick(id) {
    try {
      const response = await fetch(`/api/chat/conversation/check/${id}`);
      const result = await response.json();

      if (!response.ok) return;


      navigate(`/chat/conversation/${result.conversationID}`);
      
    } catch(err) {
      console.log(err);
      return;
    }
  }

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

        <div>

        {/* Search */}
        <div className="p-3 bg-base-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats"
              value={searchText}
              onChange={handleTextChange}
              onFocus={() => setIsSearchedFocused(true)}
              // onBlur={() => setIsSearchedFocused(false) }
              onBlur={() => setTimeout(() => setIsSearchedFocused(false), 150) }
              className="w-full rounded-lg border border-primary px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {searchText && isSearchedFocused && (
          <ul className="bg-base-100 shadow-xl rounded-box mt-1 mx-3 absolute w-[calc(100%-24px)] max-h-80 overflow-y-auto z-50 border border-[#570DF8]">
            { 
              userResults.length <= 0 ? 
                  <div className="w-full min-h-20 flex justify-center items-center">No results found</div>
                    :
                  userResults.map((user) => {
                    return (
                      <li key={user._id} className="mt-2 mb-2">
                        <div className="flex items-center justify-between gap-1 p-2 ">
                          {/* Left: Avatar + Username */}
                          <Link to={`/profile/${user.username}`} className="flex items-center gap-3 flex-1">
                            <div className="avatar">
                              <div className="w-10 rounded-full">
                                <img
                                  src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                  alt="profile"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">{user.username}</span>
                              <span className="font-medium text-xs text-gray-600">{user.rollNo}</span>
                            </div>
                          </Link>

                          {/* Right: Message Button */}
                          <button
                            type="button"
                            className="btn btn-circle bg-[#570DF8]"
                            title="Message"
                            onMouseDown={() => handleMessageClick(user._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="white"
                              className="w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 10h8M8 14h6M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.83L3 20l1.83-4A7.72 7.72 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                          </button>

                        </div>
                      </li>
                    )
                  })
                }
            <div ref={lastElementRef}></div>
          </ul>
        )}

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
      <Footer />
    </div>
  );
}
