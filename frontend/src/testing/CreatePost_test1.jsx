import { useState } from "react";

export default function CreatePost_test1() {
  const [images, setImages] = useState([]);
  const [activeImageNo, setActiveImageNo] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // setImages((prev) => [...prev, ...files]);
    setImages(files);
  };

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title: e.target.title.value,
      price: e.target.price.value,
      category: e.target.category.value,
      condition: e.target.condition.value,
      description: e.target.description.value,
      tags,
      images,
    };

    console.log(postData);
    // send to backend
  };

  return (
    <div className="max-w-xl mx-auto p-4 pb-28">
      <div className="flex items-center justify-center mt-2 mb-8 mr-10">
        <div className="btn bg-[#570DF8] text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </div>

        <h1 className=" flex-1 text-xl font-semibold text-center text-primary">Create Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* IMAGES */}
        <div>
          <label className="font-medium block mb-3">Images</label>
          <div>
            {images.length !== 0 &&
              <div className=" rounded-lg overflow-hidden p-5 mr-3 ml-3 border-[#570DF8] bg-gray-50">
              <img
                src={images.length !== 0 ? URL.createObjectURL(images[activeImageNo]) : null}
                alt="Item"
                className="w-full h-[350px] object-contain bg-white"
              />
            </div> 
          }
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full mt-2 border-[#570DF8]"
          />

          {images.length > 0 && (
            <div className="flex gap-3 mt-3 overflow-x-auto">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  className={` p-1 w-20 h-20 object-cover rounded ${i === activeImageNo && 'border border-[#570DF8]'}`}
                  onClick={() => setActiveImageNo(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* TITLE */}
        <div>
          <label className="font-medium">Title</label>
          <input
            name="title"
            type="text"
            placeholder="E-Commerce Book – 7th Edition"
            className="input input-bordered w-full mt-2 border-[#570DF8]"
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="font-medium">Price (₹)</label>
          <input
            name="price"
            type="number"
            placeholder="200"
            className="input input-bordered w-full mt-2 border-[#570DF8]"
            required
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="font-medium">Category</label>
          <select
            name="category"
            className="select select-bordered w-full mt-2 border-[#570DF8]"
            required
          >
            <option value="">Select category</option>
            <option>Book</option>
            <option>Notes</option>
            <option>Question Paper</option>
            <option>Others</option>
          </select>
        </div>

        {/* CONDITION */}
        <div>
          <label className="font-medium">Condition</label>
          <select
            name="condition"
            className="select select-bordered w-full mt-2 border-[#570DF8]"
            required
          >
            <option value="">Select condition</option>
            <option>New</option>
            <option>Like New</option>
            <option>Used</option>
            <option>Heavily Used</option>
            <option>Damaged</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Used for one semester, no torn pages..."
            className="textarea textarea-bordered w-full mt-2 border-[#570DF8]"
          />
        </div>

        {/* TAGS */}
        <div>
          <label className="font-medium">Tags</label>
          <div className="flex rounded-sm w-full border border-[#570DF8] mt-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder="Press Enter to add tag"
            className="input border-none outline-none"
          />

          <div className="btn bg-[#570DF8] text-white" tabIndex={0} role="button" onClick={(e) => addTag({...e, key:"Enter", preventDefault: () => {}})}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
          </div>

          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-primary text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-xs text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* POST BUTTON */}
        <button
          type="submit"
          className="w-full bg-[#570DF8] text-white py-3 rounded-lg hover:bg-[#4b0ed6] transition"
        >
          Post Item
        </button>
      </form>
    </div>
  );
}
