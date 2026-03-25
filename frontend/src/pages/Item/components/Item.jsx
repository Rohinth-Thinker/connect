
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../context/AuthContext";

import ItemCard from "../../Home/components/ItemCard";
import LoadingComponent from "../../../comoponets/LoadingComponent";
import NotFoundComponent from "../../../comoponets/NotFoundComponent";
import { DEFAULT_AVATAR_URL } from "../../../App";

export default function Item({ id, savedState }) {
  const [activeImage, setActiveImage] = useState(0);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSold,setIsSold] = useState(false);
  const [isSaved, setIsSaved] = useState(savedState);
  const {authUser} = useAuthContext();
  const navigate = useNavigate();


  useEffect(() => {
    const controller = new AbortController();

    async function fetchItem() {
      try {
        setLoading(true);
        const response = await fetch(`/api/items/${id}`, {
          signal: controller.signal,
        })

        const result = await response.json();
        if (!response.ok) {
          return
        }

        setItem(result);
        setIsSold(result.isSold);

      } catch(err) {
        console.log("Error occured: ", err);
      } finally {
        setLoading(false);
      }
    }

    fetchItem()

    return () => controller.abort();
  }, [])

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

  console.log(item);

  function handleSoldItem(state) {
      setIsSold(state);

      fetch('/api/items/isSold/update', {
          method: "PATCH",
          body: JSON.stringify({id, isSold}),
          headers: {
              "Content-Type": "application/json",
      }
  })
  }

  function handleSaveItem() {
    const nextState = !isSaved;
    setIsSaved(nextState);

    fetch('/api/profile/savedItemsID/update', {
        method: "PATCH",
        body: JSON.stringify({id, isSaved}),
        headers: {
            "Content-Type": "application/json",
        }
    })
  }

  function handleShare() {
    const shareData = {
      title: item.title,
      text: `Check this item on Connect 👇\n₹${item.price}\n`,
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData)
          .catch((err) => console.log("Share Cancelled", err));
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }  
  }

  if (loading) {
    return <div className="mt-15"><LoadingComponent />;</div>
  }

  if (!item) {
    return <NotFoundComponent showAction={true} onAction={() => navigate(-1)} />;
  }

  const isOwner = authUser?.userID === item.owner._id;
  const dateFormat = { day: '2-digit', month: '2-digit', year: '2-digit' };
  const date = new Date(item.createdAt).toLocaleDateString('en-Gb', dateFormat).replace(/\//g, '-');

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 mb-1 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div>
          <div className="rounded-lg overflow-hidden p-5 mr-3 ml-3 border-[#570DF8] bg-gray-50">

            <div className="relative">
              <img
                src={item.images[activeImage]}
                alt="Item"
                className="w-full max-h-[350px] object-contain bg-white"
              />

              <button onClick={handleShare} className="btn btn-ghost btn-circle absolute top-1 right-2 bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                  </svg>
              </button>
            </div>

          </div>

          <div className="flex gap-3 mt-6 overflow-auto w-full">
            {item.images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setActiveImage(index)}
                className={`min-w-20 max-w-20 h-20 p-1 object-contain border rounded cursor-pointer ${
                  activeImage === index
                    ? "border-[#570DF8]"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">
            { item.title }
          </h1>

          <div className="flex items-center gap-4 mt-2">
            <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
            <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-primary">
              {item.condition}
            </span>
            <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-primary">
              {item.category}
            </span>

            { isSold ?
                <span className="text-sm px-3 py-1 bg-red-600 rounded-full text-white">
                  Sold
                </span>
                  :
                <span className="text-sm px-3 py-1 bg-blue-600 rounded-full text-white">
                  Unsold
                </span>
            }

          </div>

          <p className="text-sm text-gray-500 mt-2">
            • Posted on 27-12-2025
          </p>

            <div className="flex gap-4 mt-6 pr-4">
              {isOwner ?

                  isSold ?
                  <button onClick={() => handleSoldItem(false)} className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-gray-800">
                    Sold
                  </button>
                    :
                  <button onClick={() => handleSoldItem(true)} className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-gray-800">
                    Unsold
                  </button>
                
                  :

                  item.isSold ?
                      <button disabled className="flex-1 bg-gray-300 text-gray-500 py-3 rounded-lg hover:bg-gray-800">
                        Sold
                      </button>
                        :
                      <button onClick={() => handleMessageClick(item.owner._id)} className="flex-1 bg-[#570DF8] text-white py-3 rounded-lg hover:bg-gray-800">
                        Message Seller
                      </button>
            }
            { authUser &&
              <button onClick={handleSaveItem} className="btn btn-ghost btn-circle">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill={isSaved ? 'red' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364 4.318 12.682a4.5 4.5 0 010-6.364z"
                      />
                  </svg>
              </button>
            }
          </div>

          <div className="mt-8">
            <h2 className="font-semibold text-lg mb-2">Description</h2>

            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="mt-8 rounded-lg p-4 border-[#570DF8] border-2">
            <div className="flex items-center gap-4">
              <img
                src={item.owner.avatar || DEFAULT_AVATAR_URL}
                className="w-12 h-12 rounded-full"
                alt="Seller"
              />
              <div>
                <p className="font-medium">@{item.owner.username}</p>
                <p className="text-sm text-gray-500 ml-1">
                  {item.owner.rollNo}
                  {/* DG Vaishnav College · Member since 2023 */}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Link to={`/profile/${item.owner.username}`} className="text-center flex-1 border py-2 rounded hover:bg-gray-100 bg-[#570DF8] text-white">
                View Profile
              </Link>

              {!isOwner && authUser &&
                <button
                  onClick={() => handleMessageClick(item.owner._id)}
                  className="flex-1 border py-2 rounded hover:bg-gray-100 bg-[#570DF8] text-white">
                  Message
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    
    { item.tags.length > 0 &&
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-5">
            <input type="checkbox" name="my-accordion-2" />
            <div className="collapse-title font-semibold">Tags: </div>
            <div className="collapse-content text-sm">
                <div className="flex flex-wrap gap-3 mt-2">
                  {
                    item.tags.map((tag, i) => {
                      return (
                        <span key={tag+i} className="text-sm px-3 py-1 bg-gray-100 rounded-full text-primary whitespace-nowrap">
                          {tag}
                        </span>
                      )
                    })
                  }
              </div>
            </div>
        </div>
      }

      {/* SIMILAR ITEMS */}
      <div className="mt-14">
        {/* <h2 className="text-xl font-semibold mb-4">Similar Items</h2> */}
        <ItemCard />
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border rounded-lg p-3 hover:shadow cursor-pointer"
            >
              <img
                src="https://m.media-amazon.com/images/I/81yFTG9EqBL._AC_UF1000,1000_QL80_.jpg"
                className="h-32 w-full object-contain"
              />
              <p className="mt-2 text-sm font-medium line-clamp-2">
                Business Economics – Semester 3
              </p>
              <p className="text-green-600 font-semibold">₹150</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
