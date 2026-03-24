import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

import ProfilePhoto from "./ProfilePhoto.jsx";
import LoadingComponent from "../../../comoponets/LoadingComponent.jsx";

import uploadToCloudinary from "../../../utils/cloudUpload.js";

export default function EditProfile() {

  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const {authUser, setAuthUser} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({departmentName: '', bio: ''});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserProfile() {
      setLoading(true);
      const response = await fetch(`/api/profile/${authUser.username}`);
      const result = await response.json();
      setLoading(false);
      if (!response.ok) {
        console.log(result.error);
        return;
      }

      console.log(result);
      setUser(result);
      setInputs({departmentName: result.departmentName, bio: result.bio})
    }

    if (authUser?.username) fetchUserProfile();
  }, [authUser])

  function navigatePreviousPage() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  async function profileImageUpload(file) {
    setUploading(true);

    const url = await uploadToCloudinary(file, "connect_profiles", "profile_images");
    console.log(url);

    const result = await fetch('/api/profile/avatar/update', {
      method: 'PATCH',
      body: JSON.stringify({url}),
      headers: {
        "Content-Type": "application/json"
      }
    })

    setUploading(false);

    localStorage.setItem('user', JSON.stringify({...authUser, avatar: url}));
    setAuthUser({...authUser, avatar: url});

  }

  function handleTextChange(e) {
    const field = e.target.name;
    const value = e.target.value;

    switch (field) {

      case "departmentName":
        setInputs({...inputs, departmentName: value});
        break;

      case "bio":
        setInputs({...inputs, bio: value});
        break;
      
      default:
        console.log("Field name not matches at edit profile page");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let profile = {
      // username,
      // collegeName: e.target.collegeName.value,
      departmentName: e.target.departmentName.value,
      bio: e.target.bio.value,
    }

    if ( (!profile.departmentName.trim() && !profile.bio.trim()) || (profile.departmentName === user.departmentName && profile.bio === user.bio) ) {
      console.log("NO VALUE")
      navigate(`/profile/${authUser.username}`);
      return
    }

    const response = await fetch('/api/profile/edit', {
      method: "PATCH",
      body: JSON.stringify({profile}),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = await response.json();

    if (!response.ok) {
      console.log(result);
      return;
    }

    navigate(`/profile/${authUser.username}`);
  }

  return (
    <div className="max-w-xl mx-auto p-4 pb-28">
      <div className="flex items-center justify-center pt-2 pb-8 pr-10">
        <div onClick={navigatePreviousPage} className="btn bg-[#570DF8] text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </div>

        <h1 className=" flex-1 text-xl font-semibold text-center text-primary">Edit Profile</h1>
      </div>

      <ProfilePhoto onUpload={profileImageUpload} uploading={uploading} />

      <form onSubmit={handleSubmit} className="space-y-10">
        <div>
          <label className="font-medium">Username</label>
          <input
            name="username"
            type="text"
            value={ "@" + (user ? user?.username : "loading...")}
            className="input input-bordered w-full mt-2 border-gray-300"
            required readOnly disabled
          />
        </div>
        
        <div>
          <label className="font-medium">College name</label>
          <input
            name="collegeName"
            type="text"
            value="DG Vaishnav College"
            className="input input-bordered w-full mt-2 border-gray-300"
            required readOnly disabled
          />
        </div>

        <div>
          <label className="font-medium">Department name</label>
          <input
            name="departmentName"
            value={inputs.departmentName}
            onChange={handleTextChange}
            type="text"
            placeholder="Eg: B.Sc Computer Science"
            maxLength={40}
            className="input input-bordered w-full mt-2 border-[#570DF8]"
          />
        </div>

        <div>
          <label className="font-medium">Bio</label>
          <textarea
            name="bio"
            rows="4"
            value={inputs.bio}
            onChange={handleTextChange}
            placeholder="Write about you..."
            maxLength={200}
            className="textarea textarea-bordered w-full mt-2 border-[#570DF8]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? "bg-[#570df881]" : "bg-[#570DF8]"} text-white py-3 rounded-lg hover:bg-[#4b0ed6] transition`}
        >
          {loading ? <LoadingComponent text="Edit" color="text-white" /> : "Edit"}
        </button>
      </form>
    </div>
  );
}
