import { useState } from "react";
import DriveHeader from "./components/DriveHeader";
import DriveGrid from "./components/DriveGrid";

const ClassroomDrive = () => {
  const [structure, setStructure] = useState({
    name: "root",
    folders: [],
    files: [],
  });

  const [path, setPath] = useState([structure]);

  const current = path[path.length - 1];

  const refresh = () => {
    setStructure({ ...structure });
  };

  const openFolder = (folder) => {
    setPath((prev) => [...prev, folder]);
  };

  const goBack = (index) => {
    setPath(path.slice(0, index + 1));
  };

  // 🔥 CHECK DUPLICATE
  const isDuplicate = (name) => {
    return (
      current.folders.some((f) => f.name === name) ||
      current.files.some((f) => f.name === name)
    );
  };

  const addFolder = (name) => {
    if (isDuplicate(name)) {
      alert("Folder name already exists!");
      return;
    }

    current.folders.push({
      name,
      folders: [],
      files: [],
    });

    refresh();
  };

  const addFiles = (files) => {
    const newFiles = [];

    Array.from(files).forEach((file) => {
      if (isDuplicate(file.name)) {
        alert(`File "${file.name}" already exists`);
        return;
      }

      newFiles.push({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      });
    });

    current.files.push(...newFiles);
    refresh();
  };

  const deleteFolder = (index) => {
    current.folders.splice(index, 1);
    refresh();
  };

  const deleteFile = (index) => {
    current.files.splice(index, 1);
    refresh();
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <DriveHeader
        path={path}
        goBack={goBack}
        addFolder={addFolder}
        addFiles={addFiles}
      />

      <DriveGrid
        folders={current.folders}
        files={current.files}
        openFolder={openFolder}
        deleteFolder={deleteFolder}
        deleteFile={deleteFile}
      />
    </div>
  );
};

export default ClassroomDrive;