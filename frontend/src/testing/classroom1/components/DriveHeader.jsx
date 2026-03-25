import { useState } from "react";

const DriveHeader = ({ path, goBack, addFolder, addFiles }) => {
  const [folderName, setFolderName] = useState("");

  return (
    <div className="mb-4">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-3">
        <ul>
          {path.map((p, i) => (
            <li key={i}>
              <button onClick={() => goBack(i)}>
                {p.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        <input
          className="input input-bordered input-sm"
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />

        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            if (!folderName.trim()) return;
            addFolder(folderName);
            setFolderName("");
          }}
        >
          + Folder
        </button>

        <label className="btn btn-sm">
          Upload
          <input
            type="file"
            hidden
            multiple
            onChange={(e) => addFiles(e.target.files)}
          />
        </label>
      </div>
    </div>
  );
};

export default DriveHeader;