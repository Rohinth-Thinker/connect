import { forwardRef, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

import LoadingComponent from "../../../comoponets/LoadingComponent";

const ItemCard = forwardRef(({items, loading, savedItemsIDs}, ref) => {

    // if (items?.length === 0) {
    //     return ( 
    //         <div className="">
    //             <h1>No items found</h1>
    //         </div>
    //     )
    // }

    const cards = items?.map((item) => {

        const isSavedByUser = !savedItemsIDs || savedItemsIDs?.includes(item._id);

        return (
            <Card key={item._id} item={item} isSavedByUser={isSavedByUser} />
        )
    })


    return (
        <>

        <div className="grid grid-cols-2 gap-6 gap-y-12 p-5 mt-5 mb-5 w-full">
            { cards }
        </div>

        <div ref={ref}></div>

        {loading  && (
            <div className="mt-10">
                <LoadingComponent />
            </div>
        )}
        
        </>
    )
})

export default ItemCard;

function Card({item, isSavedByUser}) {

    const {authUser} = useAuthContext();

    const [isSold, setIsSold] = useState(item?.isSold);
    const [isSaved, setIsSaved] = useState(isSavedByUser);

    const { _id, title, price, images, createdAt } = item;

    const dateFormat = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const date = new Date(createdAt).toLocaleDateString('en-Gb', dateFormat);

    function handleSoldItem() {
        const nextState = !isSold;
        setIsSold(nextState);

        fetch('/api/items/isSold/update', {
            method: "PATCH",
            body: JSON.stringify({id: _id, isSold}),
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
            body: JSON.stringify({id: _id, isSaved}),
            headers: {
                "Content-Type": "application/json",
            }
        })
    }

    function handleShare() {
        const shareData = {
            title: item.title,
            text: `Check this item on Connect 👇\n₹${item.price}\n`,
            url: `${window.location.origin}/items/${item._id}`,
        }

        if (navigator.share) {
            navigator.share(shareData)
                .catch((err) => console.log("Share Cancelled", err));
        } else {
            navigator.clipboard.writeText(shareData.url);
            alert("Link copied to clipboard!");
        }
    }  

    return (
        <div className="card bg-base-100 w-full shadow-xl relative rounded-md">

            <Link to={`/items/${_id}`} className="" >
                <div className={`badge badge-primary badge-xs absolute right-1 top-1 ${isSold && "bg-red-600 border-red-600"}`}>{ date }</div>
                <figure className="bg-base-300 pt-3 pb-3 rounded-md">
                    <img src={images[0]} alt="Shoes" className="rounded-md w-full h-30 object-contain" />
                </figure>

                <div className=" h-24 border-b border-dotted border-base-400 pr-3 pl-3 flex flex-col justify-center items-center gap-1">
                    <h2 className="line-clamp-2">
                        {title}
                    </h2>
    
                    <div className="text-xl font-bold text-green-600" >₹{price}</div>
                </div>
            </Link>
            
            <div className="flex justify-around pt-1 pb-1">
                {authUser?.userID === item.owner._id ? 
                    <button onClick={handleSoldItem} className={`btn rounded-full p-1 pr-2 pl-2 text-xs ${isSold && "bg-red-600 text-white"}`}>sold</button>   
                        :
                    <Link to={`/profile/${item.owner.username}`} tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-6 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={item.owner.avatar || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} />
                        </div>
                    </Link>
                }

                <button onClick={handleSaveItem} className="btn btn-ghost btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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

                <button onClick={handleShare} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                    </svg>
                </button>


            </div>
        </div>
    )
}