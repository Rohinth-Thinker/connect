import { useEffect, useState } from "react";
import itemDetails from "../../../testing/itemDetails";
import { Link } from "react-router-dom";

function ItemCard() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [savedItems, setSavedItems] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchItems() {
            try {
                setLoading(true);
                const response = await fetch('/api/items/', {
                    signal: controller.signal,
                });
                const result = await response.json();

                if(!response.ok) {
                    return;
                }

                setItems(result);
            } catch(err) {}
            finally {
                setLoading(false);
            }
        }

        fetchItems();

        return () => controller.abort();

    }, [])

    useEffect(() => {
        const controller = new AbortController();

        async function fetchSavedItems() {
            try {
                const response = await fetch('/api/profile/savedItems', {
                    signal: controller.signal,
                })

                const result = await response.json();

                if (!response.ok) {
                    return;
                }

                setSavedItems(result);
            } catch(err) {}
        }

        fetchSavedItems();

        return () => controller.abort();
    }, [])

    // if (loading) {
    //     return (
    //         <div>
    //             <h1>Loading...</h1>
    //         </div>
    //     )
    // }

    // if (!items) {
    //     return ( 
    //         <div className="">
    //             <h1>Something went wrong</h1>
    //             <h1>Refresh again</h1>
    //         </div>
    //     )
    // }

    // if (items?.length === 0) {
    //     return ( 
    //         <div className="">
    //             <h1>No items found</h1>
    //         </div>
    //     )
    // }

    const cards = items.map((item) => {

        const isSavedByUser = savedItems.includes(item._id);

        return (
            <Card key={item._id} item={item} isSavedByUser={isSavedByUser} />
        )
    })

    return (
        <div className="grid grid-cols-2 gap-6 gap-y-12 p-5 mt-5 mb-5">
            { cards }
        </div>
    )
}

export default ItemCard;

function Card({item, isSavedByUser}) {

    const [isSaved, setIsSaved] = useState(isSavedByUser);
    const { _id, title, price, images, createdAt } = item;

    const dateFormat = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const date = new Date(createdAt).toLocaleDateString('en-Gb', dateFormat);

    function handleSaveItem() {
        const nextState = !isSaved;
        setIsSaved(nextState);

        fetch('/api/profile/savedItems/update', {
            method: "PATCH",
            body: JSON.stringify({id: _id, isSaved: !isSaved}),
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
    <div className="badge badge-primary badge-xs absolute right-1 top-1">{ date }</div>
  <figure className="bg-base-300 pt-3 pb-3 rounded-md">
    <img className="rounded-md w-full h-30 object-contain"
      src={images[0]}
      alt="Shoes" />
  </figure>
  <div className=" h-24 border-b border-dotted border-base-400 pr-3 pl-3 flex flex-col justify-center items-center gap-1">
        <h2 className="line-clamp-2">
        {title}
        </h2>
        {/* <div className="bg-white ">
            <div className="badge badge-xs badge-neutral badge-outline ">Outline</div>
        </div> */}

        <div className="text-xl font-bold text-green-600" >₹{price}</div>

  </div>
  </Link>
    
    <div className="flex justify-around pt-1 pb-1">
        <Link to={`/${item.owner.username}`} tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-6 rounded-full">
            <img
                alt="Tailwind CSS Navbar component"
                src={item.owner.avatar || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} />
        </div>
        </Link>

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