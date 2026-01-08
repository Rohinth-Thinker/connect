
import { useState } from "react";

export default function Login_test1() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = {
      username: e.target.username.value.trim(),
      password: e.target.password.value,
    };

    try {
      console.log("Login data:", data);
      // 👉 send to backend
      // await login(data)
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
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
            {loading ? "Logging in..." : "Login"}
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
            <a className="ml-1 text-[#570DF8] font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
