
import { useState } from "react";
import ItemCard from "../pages/Home/components/ItemCard";

export default function ItemPage_test1() {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    "https://m.media-amazon.com/images/I/81yFTG9EqBL._AC_UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/71t4GuxLCuL._AC_UF1000,1000_QL80_.jpg",
    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQmkyYaXfgokVNqYD-b-9ILZJz-lEqG11jQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQmkyYaXfgokVNqYD-b-9ILZJz-lEqG11jQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQmkyYaXfgokVNqYD-b-9ILZJz-lEqG11jQ&s",

  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 mt-5 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGE SECTION */}
        <div>
          <div className=" rounded-lg overflow-hidden p-5 mr-3 ml-3 border-[#570DF8] bg-gray-50">
            <img
              src={images[activeImage]}
              alt="Item"
              className="w-full h-[350px] object-contain bg-white"
            />
          </div>

          <div className="flex gap-3 mt-6 overflow-auto w-full">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setActiveImage(index)}
                className={` min-w-20 h-20 p-1 object-contain border rounded cursor-pointer ${
                  activeImage === index
                    ? "border-[#570DF8]"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div>
          <h1 className="text-2xl font-semibold">
            E-Commerce – Seventh Edition
          </h1>

          <div className="flex items-center gap-4 mt-2">
            <span className="text-2xl font-bold text-green-600">₹200</span>
            <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-primary">
              Used
            </span>
            <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-primary">
              Book
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {/* 👁 124 views · Posted 2 days ago */}
            • Posted on 27-12-2025
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-6 pr-4">
            <button className="flex-1 bg-[#570DF8] text-white py-3 rounded-lg hover:bg-gray-800">
              Message Seller
            </button>
            <button className="btn btn-ghost btn-circle">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364 4.318 12.682a4.5 4.5 0 010-6.364z"
                />
            </svg>
        </button>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-8">
            <h2 className="font-semibold text-lg mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              Seventh edition E-Commerce textbook by P.T. Joseph, S.J.
              <br />
              <br />
              • Very good condition  
              <br />
              • No missing pages  
              <br />
              • Useful for B.Com & BBA students  
              <br />
              • Slight highlights on few pages
            </p>
          </div>

          {/* SELLER INFO */}
          <div className="mt-8 rounded-lg p-4 border-[#570DF8] border-2">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100"
                className="w-12 h-12 rounded-full"
                alt="Seller"
              />
              <div>
                <p className="font-medium">@rohinth</p>
                <p className="text-sm text-gray-500">
                  DG Vaishnav College · Member since 2023
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button className="flex-1 border py-2 rounded hover:bg-gray-100 bg-[#570DF8] text-white">
                View Profile
              </button>
              <button className="flex-1 border py-2 rounded hover:bg-gray-100 bg-[#570DF8] text-white">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

    <div className="collapse collapse-arrow bg-base-100 border border-base-300 mt-5">
        <input type="checkbox" name="my-accordion-2" />
        <div className="collapse-title font-semibold">Tags: </div>
        <div className="collapse-content text-sm">
            <div className="flex flex-wrap gap-3 mt-2">
            <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-primary whitespace-nowrap">
              Book
            </span>
            <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-primary whitespace-nowrap">
              Used
            </span>
          </div>
        </div>
    </div>

      {/* SIMILAR ITEMS */}
      <div className="mt-14">
        <h2 className="text-xl font-semibold mb-4">Similar Items</h2>
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
