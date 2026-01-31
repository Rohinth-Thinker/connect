
import { useEffect, useState } from "react";
import ItemCard from "../../Home/components/ItemCard";
import { Link, useNavigate } from "react-router-dom";

export default function Profile({ isOwner = true, user }) {
  const [activeTab, setActiveTab] = useState("items");
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // let username = 'rohinth';

  // useEffect(() => {
  //   async function fetchUserProfile() {
  //     const response = await fetch(`/api/profile/${username}`);
  //     const result = await response.json();
  //     if (!response.ok) {
  //       console.log(result.error);
  //       return;
  //     }

  //     console.log(result);
  //     setUser(result);
  //   }

  //   if (username) fetchUserProfile();
  // }, [username])

  // const user = {
  //   username: "rohinth_thinker",
  //   name: "Rohinth",
  //   collegeName: "DG Vaishnav College",
  //   departmentName: "B.Sc Computer Science",
  //   createdAt: "Joined Dec 2024",
  //   bio: "Selling books & notes. Open to negotiation.",
  //   profilePic: "https://i.pravatar.cc/150",
  // };

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

  const items = [1, 2, 3, 4];
  const savedItems = [1, 2];

  if (!user) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-4 pb-28">
      {/* HEADER */}
      <div className="flex items-center gap-5">
        <img
          src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" }
          className="w-24 h-24 rounded-full object-cover"
        />

        <div className="flex-1">
          <h1 className="text-xl font-semibold text-primary">@{user.username}</h1>
          <p className="text-sm text-gray-500">
            {user.collegeName}
          </p>
          <p className="text-xs text-gray-500">
            {user.departmentName}
          </p>
          <p className="text-xs text-gray-400">{user.createdAt}</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mt-5">
        {isOwner ? (
          <>
            <Link to={'/profile/edit'} className="flex-1 border py-2 rounded border-[#570DF8] hover:bg-gray-100 text-center">
              Edit Profile
            </Link>
            <button className="flex-1 border py-2 rounded border-[#570DF8] hover:bg-gray-100">
              Settings
            </button>
          </>
        ) : (
          <>
            <button onClick={() => handleMessageClick(user._id)} className="flex-1 bg-[#570DF8] text-white py-2 rounded hover:bg-[#4b0ed6]">
              Message
            </button>
            <button className="flex-1 border py-2 rounded hover:bg-gray-100">
              Report
            </button>
          </>
        )}
      </div>

      {/* Bio */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Bio</h2>
        <p className="text-sm text-gray-600">
          {user.bio || "No bio added yet."}
        </p>
      </div>

      {/* TABS */}
      <div className="tabs tabs-bordered mt-8">
        <button
          className={`tab ${activeTab === "items" && "tab-active font-bold text-primary"}`}
          onClick={() => setActiveTab("items")}
        >
          Items
        </button>

        {isOwner && (
          <button
            className={`tab ${activeTab === "saved" && "tab-active font-bold text-primary"}`}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </button>
        )}
      </div>

      {/* ITEMS TAB */}
      {activeTab === "items" && (
        <div className="grid gap-4 mt-5 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
          {items.map((item) => (
            <div
              key={item}
              className="border rounded-lg p-3 flex flex-col"
            >
              <img
                src="https://m.media-amazon.com/images/I/81yFTG9EqBL._AC_UF1000,1000_QL80_.jpg"
                className="h-36 object-contain mb-2"
              />

              <p className="text-sm font-medium line-clamp-2">
                E-Commerce Book
              </p>

              <p className="text-green-600 font-semibold mt-auto">₹200</p>

              {isOwner && (
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 text-xs border py-1 rounded hover:bg-gray-100">
                    Edit
                  </button>
                  <button className="flex-1 text-xs border py-1 rounded hover:bg-gray-100">
                    Sold
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SAVED ITEMS TAB */}
      {activeTab === "saved" && isOwner && (
        <ItemCard />
        // <div className="grid gap-4 mt-5 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        //   {savedItems.map((item) => (
        //     <div
        //       key={item}
        //       className="border rounded-lg p-3"
        //     >
        //       <img
        //         src="https://m.media-amazon.com/images/I/71t4GuxLCuL._AC_UF1000,1000_QL80_.jpg"
        //         className="h-36 object-contain mb-2"
        //       />
        //       <p className="text-sm font-medium line-clamp-2">
        //         Business Economics
        //       </p>
        //       <p className="text-green-600 font-semibold">₹150</p>
        //     </div>
        //   ))}
        // </div>
      )}
    </div>
  );
}
