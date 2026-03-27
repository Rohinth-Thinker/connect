import { useState } from "react";
import DriveHeader from "./components/DriveHeader";
import DriveGrid from "./components/DriveGrid";
import PreviewModal from "./components/PreviewModal";
import Navbar from "../../pages/Home/components/Navbar";
import Searchbar from "../../pages/Home/components/Searchbar";
import uploadToCloudinary from "../../utils/cloudUpload";

const ClassroomDrive = () => {
  const [structure, setStructure] = useState({
    name: "root",
    folders: [],
    files: [],
  });

  const [path, setPath] = useState([structure]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const current = path[path.length - 1];

  const refresh = () => setStructure({ ...structure });

  const openFolder = (folder) => setPath((prev) => [...prev, folder]);
  const goBack = (index) => setPath(path.slice(0, index + 1));

  const isDuplicate = (name) =>
    current.folders.some((f) => f.name === name) ||
    current.files.some((f) => f.name === name);

  const addFolder = (name) => {
    if (isDuplicate(name)) return alert("Folder exists!");
    current.folders.push({ name, folders: [], files: [] });
    refresh();
  };

  // 🔥 FAKE UPLOAD DELAY + LOADING
  const addFiles = async (files) => {
    setLoading(true);

    const newFiles = [];

    for (let file of files) {
      if (isDuplicate(file.name)) {
        alert(`${file.name} exists`);
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} file must be under 10MB`);
        continue;
    }

      // simulate upload delay
    //   await new Promise((res) => setTimeout(res, 800));
    
    const upload = await uploadToCloudinary(file, "connect_classroom_files", "classroom_files");
    console.log(upload);
    
      newFiles.push({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      });
    }

    current.files.push(...newFiles);
    setLoading(false);
    refresh();
  };

  const deleteFolder = (i) => {
    current.folders.splice(i, 1);
    refresh();
  };

  const deleteFile = (i) => {
    current.files.splice(i, 1);
    refresh();
  };

  return (
    <>
    <Navbar />
    <div className="p-4 max-w-5xl mx-auto">

      <DriveHeader
        path={path}
        goBack={goBack}
        addFolder={addFolder}
        addFiles={addFiles}
        loading={loading}
      />

      <DriveGrid
        folders={current.folders}
        files={current.files}
        openFolder={openFolder}
        deleteFolder={deleteFolder}
        deleteFile={deleteFile}
        openPreview={setPreview}
      />

      {preview && (
        <PreviewModal file={preview} close={() => setPreview(null)} />
      )}
    </div>
    </>
  );
};

export default ClassroomDrive;