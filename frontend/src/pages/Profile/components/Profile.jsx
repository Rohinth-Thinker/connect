
import { useState } from "react";
import ItemCard from "../../Home/components/ItemCard";
import { Link, useNavigate } from "react-router-dom";
import LoadingComponent from "../../../comoponets/LoadingComponent";
import SavedItemsList from "./SavedItemsList";
import UserItemListings from "./UserItemListings";

export default function Profile({ isOwner, user, loading }) {
  const [activeTab, setActiveTab] = useState("items");
  const navigate = useNavigate();

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

  if (loading && !user) {
    return (
      <div className="mt-10">
        <LoadingComponent />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="mt-10">
        <h1>NOT FOUND</h1>
      </div>
    )
  }


  const dateFormat = { day: '2-digit', month: '2-digit', year: '2-digit' };
  const date = new Date(user?.createdAt).toLocaleDateString('en-Gb', dateFormat).replaceAll('/', '-');

  return (
    <div className="max-w-5xl mx-auto p-4 pb-28">
      <div className="flex items-center gap-5">
        <img
          src={user?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" }
          className="w-24 h-24 rounded-full object-cover"
        />

        <div className="flex-1">
          <h1 className="text-xl font-semibold text-primary">@{user?.username}</h1>
          <p className="text-sm text-gray-500">
            {user?.collegeName}
          </p>
          <p className="text-xs text-gray-500">
            {user?.departmentName}
          </p>
          <p className="text-xs text-gray-400">since {date}</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mt-5">
        {isOwner ? (
          <>
            <Link to={'/profile/edit'} className="flex-1 border py-2 rounded border-[#570DF8] hover:bg-gray-100 text-center">
              Edit Profile
            </Link>
            <button disabled className="flex-1 border py-2 rounded border-gray bg-gray-200 text-gray-400 hover:bg-gray-100">
              Settings
            </button>
          </>
        ) : (
          <>
            <button onClick={() => handleMessageClick(user?._id)} className="flex-1 bg-[#570DF8] text-white py-2 rounded hover:bg-[#4b0ed6]">
              Message
            </button>
            <button disabled className="flex-1 border py-2 rounded border-gray bg-gray-200 text-gray-400 hover:bg-gray-100">
              Report
            </button>
          </>
        )}
      </div>

      {/* Bio */}
      <div className="mt-6 pl-1 pr-1">
        <h2 className="font-semibold mb-2">Bio</h2>
        <p className="whitespace-pre-wrap text-sm text-gray-600 wrap-break-word">
          {user?.bio || "No bio added yet."}
          {/* {console.log(user?.bio.length)} */}
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
        // <div className="grid gap-4 mt-5 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        //   {users?.listings?.map((item) => (
        //     <div
        //       key={item._id}
        //       className="border rounded-lg p-3 flex flex-col"
        //     >
        //       <img
        //         src={item.images[0]}
        //         className="h-36 object-contain mb-2"
        //       />

        //       <p className="text-sm font-medium line-clamp-2">
        //         {item.title}
        //       </p>

        //       <p className="text-green-600 font-semibold mt-auto">₹{item.price}</p>

        //       {isOwner && (
        //         <div className="flex gap-2 mt-3">
        //           <button className="flex-1 text-xs border py-1 rounded hover:bg-gray-100">
        //             Edit
        //           </button>
        //           <button className="flex-1 text-xs border py-1 rounded hover:bg-gray-100">
        //             Sold
        //           </button>
        //         </div>
        //       )}
        //     </div>
        //   ))}
        // </div>
        <UserItemListings userID={user?._id} />
      )}

      {/* SAVED ITEMS TAB */}
      {activeTab === "saved" && isOwner && (
        <SavedItemsList />
        // <ItemCard />
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
