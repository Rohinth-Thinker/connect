const getFileIcon = (type) => {
  if (type.startsWith("image")) return "🖼";
  if (type.startsWith("video")) return "🎥";
  if (type.includes("pdf")) return "📕";
  if (type.includes("zip")) return "🗜";
  if (type.includes("word")) return "📄";
  return "📁";
};

const DriveGrid = ({
  folders,
  files,
  openFolder,
  deleteFolder,
  deleteFile,
  openPreview,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {/* FOLDERS */}
      {folders.map((folder, i) => (
        <div key={i} className="card bg-base-200 p-3 relative">
          <div className="absolute right-2 top-2 dropdown dropdown-end">
            <label tabIndex={0}>⋮</label>
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
              <li>
                <button onClick={() => deleteFolder(i)}>Delete</button>
              </li>
            </ul>
          </div>

          <div onClick={() => openFolder(folder)} className="cursor-pointer">
            <div className="text-3xl">📁</div>
            <p className="mt-2 text-sm truncate">{folder.name}</p>
          </div>
        </div>
      ))}

      {/* FILES */}
      {files.map((file, i) => {
        const isImage = file.type.startsWith("image");

        return (
          <div key={i} className="card bg-base-100 p-2 shadow relative">

            <div className="absolute right-2 top-2 dropdown dropdown-end">
              <label tabIndex={0}>⋮</label>
              <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                <li>
                  <button onClick={() => deleteFile(i)}>Delete</button>
                </li>
              </ul>
            </div>

            <div
              onClick={() => openPreview(file)}
              className="cursor-pointer"
            >
              {isImage ? (
                <img
                  src={file.url}
                  className="h-24 w-full object-cover rounded"
                />
              ) : (
                <div className="h-24 flex items-center justify-center text-3xl">
                  {getFileIcon(file.type)}
                </div>
              )}

              <p className="text-xs mt-1 truncate">{file.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DriveGrid;