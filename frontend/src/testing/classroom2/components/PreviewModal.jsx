const PreviewModal = ({ file, close }) => {
  const isImage = file.type.startsWith("image");
  const isVideo = file.type.startsWith("video");

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
      
      {/* MODAL BOX */}
      <div className="bg-base-100 rounded w-full max-w-3xl max-h-[90vh] flex flex-col relative">

        {/* HEADER */}
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="font-semibold text-sm sm:text-base truncate">
            {file.name}
          </h2>

          <button
            className="btn btn-xs sm:btn-sm"
            onClick={close}
          >
            ✕
          </button>
        </div>

        {/* CONTENT (SCROLLABLE) */}
        <div className="p-3 overflow-auto flex-1 flex items-center justify-center">

          {isImage && (
            <img
              src={file.url}
              className="max-h-full max-w-full object-contain rounded"
            />
          )}

          {isVideo && (
            <video
              controls
              className="max-h-full max-w-full rounded"
            >
              <source src={file.url} />
            </video>
          )}

          {!isImage && !isVideo && (
            <div className="text-center">
              <p className="mb-3 text-sm">Preview not available</p>
              <a
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                Open File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;