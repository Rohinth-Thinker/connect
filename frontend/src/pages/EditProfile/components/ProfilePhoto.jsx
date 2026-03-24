import { useEffect, useRef, useState } from "react";
import LoadingComponent from "../../../comoponets/LoadingComponent";

const ProfilePhoto = ({ imageUrl, onUpload, uploading }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    }
  }, [preview])

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleChangeClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl)

    // Send file to parent
    if (onUpload) onUpload(file);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Profile Image */}
      <div
        onClick={handleImageClick}
        className="w-32 h-32 rounded-full overflow-hidden cursor-pointer border-4 border-gray-200 hover:scale-105 transition"
      >
        {!uploading && imageUrl ?
          <img
            src={preview || imageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
            :
          <LoadingComponent text={uploading ? "uploading" : "loading"} />
        }
      </div>

      {/* Change Button */}
        <>
          <button
            onClick={handleChangeClick}
            className="mt-3 text-sm text-blue-600 font-semibold hover:underline"
          >
            Change Photo
          </button>

          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </>

      {/* View Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <img
            src={preview || imageUrl}
            alt="Full View"
            className="max-w-[90%] max-h-[90%] rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;