
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";

export default function Test() {
  const [activeChat, setActiveChat] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  // const [messagesByID, setMessageByID] = useState({});
  const {authUser} = useAuthContext();
  const [textInput, setTextInput] = useState('');
  const {socket} = useSocketContext();
  
  const chatRef = useRef(null)
  const bottomRef = useRef(null)
  const [isAtBottom, setIsAtBottom] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, setHashMore] = useState(false);
  const isFetchingRef = useRef(false);
  const scrollRef = useRef({prevScrollHeight: 0, prevScrollTop: 0});

  const {id} = useParams();

  useEffect(() => {
  setMessages([]);
  setPage(1);
  setHashMore(false);
  isFetchingRef.current = false;
}, [id]);

  useEffect(() => {
    async function getConversation() {
      const response = await fetch(`/api/chat/conversation/${id}?page=${page}&limit=${15}`);
      const result = await response.json();

      if (!response.ok) {
        return;
      }

      setConversation((prev) => prev ?? result.conversation);
      const reversedMessages = [...result.messages].reverse();      
      setMessages((prev) => mergeMessagesById(prev, reversedMessages, 'prepend'));
      setHashMore(result.hasMore);
      isFetchingRef.current = false;

      requestAnimationFrame(() => {
        const el = chatRef.current;
        if (!el) return;

        const newScrollHeight = el.scrollHeight;
        const diff = newScrollHeight - scrollRef.current.prevScrollHeight;

        el.scrollTop = diff + scrollRef.current.prevScrollTop - 15;
      })
    }

    if (id) getConversation();
  }, [id, page])


  useEffect(() => {
    if (socket && conversation) {
      socket.emit('joinRoom', conversation._id);

      const handleNewMessage = (message) => {
        console.log(message, "Heyyy");
        setMessages((prev) => mergeMessagesById(prev, [message], 'append'));
      }

      socket.on('newMessage', handleNewMessage);

      return () => {
        socket.off('newMessage', handleNewMessage);
      }
    }

  }, [conversation, socket])

  useEffect(() => {
    if (isAtBottom) {
      bottomRef?.current?.scrollIntoView({behavior: "smooth"});
    }
  }, [messages.length])


function mergeMessagesById(prev, messages, position) {
  const map = new Map();
  if (position === 'prepend') {
    [...messages, ...prev].forEach((m) => map.set(m._id, m));
  } else {
    [...prev, ...messages].forEach((m) => map.set(m._id, m));
  }
  return Array.from(map.values());
}


  function handleScroll() {
    const el = chatRef.current;
    if (!el) return

    const calculatedIsAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 50;

    if (el.scrollTop < 50 && hasMore && !isFetchingRef.current) {
      scrollRef.current = {prevScrollHeight: el.scrollHeight, prevScrollTop: el.scrollTop}

      setPage((p) => p + 1);
      isFetchingRef.current = true;
    }

    setIsAtBottom(calculatedIsAtBottom);
  }

  function handleSetTextInput(e) {
    setTextInput(e.target.value);
  }

  function navigatePreviousPage() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  async function onSubmit() {
    if (!textInput || !textInput.trim()) {
      console.log(false);
      return;
    }
    
    const response = await fetch('/api/chat/message/add', {
      method: 'POST',
      body: JSON.stringify({conversationID: conversation._id, messageText: textInput}),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const result = await response.json();
    if (!response.ok) {
      return;
    }

    setTextInput('');
  }

  const participant = conversation?.conversation.find((member) => member._id !== authUser.userID);

  if (!conversation) {
    return;
  }

  return (
    <div className="h-dvh relative bg-neutral-50 md:flex">
      {/* RIGHT PANEL (CHAT WINDOW) */}
      <div
        className={`absolute md:static inset-0 flex-1 bg-neutral-50 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isChatOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
      >
        {activeChat && (
          <>
            {/* Chat Header */}
            <div className="px-3 py-3 border-b bg-white flex items-center gap-2 ">
          
              <div onClick={navigatePreviousPage} className="btn bg-[#570DF8] text-white h-8 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
              </div>

              <Link to={`/profile/${participant.username}`} className="flex items-center gap-1">

                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={participant.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                  </div>
              </div>
              
              <p className="font-medium text-sm">{participant.username}</p>


                {/* <p className="font-medium">{participant.username}</p> */}
                {/* <span className="text-xs text-green-500">Online</span> */}
              </Link>
            </div>

            {/* Messages */}
            <div ref={chatRef}
               onScroll={handleScroll} 
               className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
                <div></div>
              {messages.map((msg) => {

                return (
                    <div
                      key={msg._id}
                      className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
                        msg.sender === authUser.userID
                          ? "ml-auto bg-purple-600 text-white"
                          : "mr-auto bg-white border"
                      }`}
                    >
                      {msg.text}

                    </div>
                )
              })}

              <div ref={bottomRef}></div>

            </div>

            {/* Message Input */}
            <div className="px-4 py-3 border-t bg-white sticky bottom-0 w-full">
              <div className="flex items-center gap-3">
                {/* <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                /> */}
                {/* <textarea
                  placeholder="Type a message..."
                  rows={1}
                  className="flex-1 px-4 py-2 border rounded-2xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                /> */}
                
                <ChatInput input={textInput} setInput={handleSetTextInput} />
                <button
                  onClick={onSubmit}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700">
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

const MAX_HEIGHT  = 100;
function ChatInput({ input, setInput }) {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const el = textareaRef.current;
    el.style.height = "auto";
    if (el.scrollHeight <= MAX_HEIGHT) {
      el.style.height = el.scrollHeight + "px";
      el.style.overflowY = "hidden";
    } else {
      el.style.height = MAX_HEIGHT + "px";
      el.style.overflowY = "auto";
    }
  };

  return (
    <textarea
      ref={textareaRef}
      placeholder="Type a message..."
      rows={1}
      onInput={handleInput}
      value={input}
      onChange={setInput}
      className="flex-1 px-4 py-2 border rounded-2xl text-sm resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
}
