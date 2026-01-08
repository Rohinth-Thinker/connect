import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

export default function EditProfile() {

  const {authUser} = useAuthContext();
  const navigate = useNavigate();

  function navigatePreviousPage() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const profile = {
      // username,
      collegeName: e.target.collegeName.value,
      departmentName: e.target.departmentName.value,
      bio: e.target.bio.value,
    }

    if (!profile.departmentName.trim() && !profile.bio.trim()) {
      console.log("NO VALUE")
      navigate('/profile');
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

    navigate('/profile');
  }

  return (
    <div className="max-w-xl mx-auto p-4 pb-28">
      <div className="flex items-center justify-center mt-2 mb-8 mr-10">
        <div onClick={navigatePreviousPage} className="btn bg-[#570DF8] text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </div>

        <h1 className=" flex-1 text-xl font-semibold text-center text-primary">Edit Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Username */}
        <div>
          <label className="font-medium">Username</label>
          <input
            name="username"
            type="text"
            value={'@' + authUser.username}
            className="input input-bordered w-full mt-2 border-gray-300"
            required readOnly disabled
          />
        </div>
        
        {/* College Name */}
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

        {/* Department Name */}
        <div>
          <label className="font-medium">Department name</label>
          <input
            name="departmentName"
            type="text"
            placeholder="Eg: B.Sc Computer Science"
            className="input input-bordered w-full mt-2 border-[#570DF8]"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="font-medium">Bio</label>
          <textarea
            name="bio"
            rows="4"
            placeholder="Write about you..."
            className="textarea textarea-bordered w-full mt-2 border-[#570DF8]"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-[#570DF8] text-white py-3 rounded-lg hover:bg-[#4b0ed6] transition"
        >
          Edit
        </button>
      </form>
    </div>
  );
}
