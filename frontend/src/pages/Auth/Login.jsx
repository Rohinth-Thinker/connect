
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useAuthContext } from "../../context/AuthContext";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, authenticate] = useLogin();
  const {setAuthUser} = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value.toLowerCase();
    const password = e.target.password.value;

    const response = await authenticate({username, password});
    if (!response.status) {
        setError(response.error)
        return;
    }

    console.log("Signin:", {username, password});

    localStorage.setItem('user', JSON.stringify({username, userID: response.userID}));
    setAuthUser({username, userID: response.userID});

    e.target.username.value = '';
    e.target.password.value = '';
    setError("");

    return;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-sm bg-base-100 rounded-xl shadow-md p-6 space-y-5 border border-[#570DF8]">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#570DF8] underline underline-offset-4">
            CONNECT
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* USERNAME */}
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="input input-bordered w-full outline-[#570DF8]"
            required
          />

          {/* PASSWORD */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full outline-[#570DF8]"
            required
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#570DF8] hover:bg-[#4b0ed6]"
            }`}
          >
            {loading ? 
                  <div className="flex gap-2 justify-center items-center">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Loging in…</span>
                  </div>

                  : 
                  
                "Log in"
            }
          </button>
        </form>

        {/* ERROR */}
        {error && (
          <p className="text-xs text-center text-red-600">
            {error}
          </p>
        )}

        {/* FOOTER LINKS */}
        <div className="text-center text-sm pt-3 border-t space-y-1">
          <p className="text-gray-500 cursor-pointer hover:underline">
            Forgot password?
          </p>
          <p className="">
            Don&apos;t have an account?
            <Link to={'/signup'} className="ml-1 text-[#570DF8] font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
