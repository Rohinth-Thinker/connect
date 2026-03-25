import { useState } from "react";

const CreatePost = ({ addPost }) => {
  const [type, setType] = useState("text");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);

    const formatted = fileList.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
      name: file.name,
    }));

    setFiles((prev) => [...prev, ...formatted]);
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newPost = {
      type,
      title,
      description,
      link,
      files,
      createdBy: "You",
      createdAt: new Date().toLocaleString(),
    };

    addPost(newPost);

    // reset
    setTitle("");
    setDescription("");
    setLink("");
    setFiles([]);
  };

  return (
    <div className="card bg-base-200 p-4 shadow-md">
      <h2 className="font-semibold mb-3">Create Post</h2>

      {/* TYPE SELECT */}
      <select
        className="select select-bordered mb-2"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="text">Text</option>
        <option value="file">File</option>
        <option value="link">Link</option>
      </select>

      {/* TITLE */}
      <input
        className="input input-bordered mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* TEXT */}
      {type === "text" && (
        <textarea
          className="textarea textarea-bordered mb-2"
          placeholder="Write something..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      )}

      {/* LINK */}
      {type === "link" && (
        <input
          className="input input-bordered mb-2"
          placeholder="Paste link..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      )}

      {/* FILE */}
      {type === "file" && (
        <>
          <input
            type="file"
            multiple
            className="file-input file-input-bordered mb-2"
            onChange={handleFileChange}
          />

          {/* FILE PREVIEW */}
          <div className="flex flex-wrap gap-2">
            {files.map((file, i) => (
              <span
                key={i}
                className="badge badge-outline text-xs"
              >
                {file.name}
              </span>
            ))}
          </div>
        </>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={handleSubmit}
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;