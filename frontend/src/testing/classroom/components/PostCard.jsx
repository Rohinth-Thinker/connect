const PostCard = ({ post }) => {
  return (
    <div className="card bg-base-100 shadow p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold">{post.title}</h2>
        <span className="text-xs text-gray-400">
          {post.createdAt}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        {post.createdBy}
      </p>

      {/* TEXT */}
      {post.type === "text" && (
        <p className="mt-2 whitespace-pre-line">
          {post.description}
        </p>
      )}

      {/* LINK */}
      {post.type === "link" && (
        <a
          href={post.link}
          target="_blank"
          rel="noreferrer"
          className="link link-primary mt-2 block break-all"
        >
          {post.link}
        </a>
      )}

      {/* FILES */}
      {post.type === "file" &&
        post.files.map((file, i) => {
          const isImage = file.type.startsWith("image");
          const isVideo = file.type.startsWith("video");

          return (
            <div key={i} className="mt-3">
              {isImage && (
                <img
                  src={file.url}
                  alt=""
                  className="rounded max-h-60 object-cover"
                />
              )}

              {isVideo && (
                <video
                  controls
                  className="w-full rounded max-h-60"
                >
                  <source src={file.url} />
                </video>
              )}

              {!isImage && !isVideo && (
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm"
                >
                  {file.name}
                </a>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default PostCard;