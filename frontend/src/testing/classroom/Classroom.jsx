import { useState } from "react";
import CreatePost from "./components/CreatePost"
import PostCard from "./components/PostCard";

const Classroom = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <CreatePost addPost={addPost} />

      <div className="mt-4 space-y-4">
        {posts.length === 0 && (
          <p className="text-center text-gray-500">
            No posts yet
          </p>
        )}

        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Classroom;