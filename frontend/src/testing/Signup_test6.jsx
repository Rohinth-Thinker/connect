
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const SCAN_TIMEOUT_MS = 15000; // 15 seconds
const STABLE_READS_REQUIRED = 2;

// OPTIONAL: adjust based on your college roll format
// const ROLLNO_REGEX = /^[A-Za-z0-9\-_/]+$/;
const ROLLNO_REGEX = /^\d{2}[A-Z]\d{4}$/; //DGVC - bsc.cs


export default function Signup_test6() {
  const [rollNo, setRollNo] = useState("");
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  const qrRef = useRef(null);
  const timeoutRef = useRef(null);

  // stability refs
  const lastValueRef = useRef("");
  const stableCountRef = useRef(0);

  /* ---------------- SCANNER LIFECYCLE ---------------- */

  useEffect(() => {
    if (!scanning) return;

    const startScanner = async () => {
      try {
        const html5QrCode = new Html5Qrcode("barcode-scanner");
        qrRef.current = html5QrCode;

        const cameras = await Html5Qrcode.getCameras();
        if (!cameras || cameras.length === 0) {
          throw new Error("No camera found");
        }

        // 🔥 FORCE BACK CAMERA
        const backCamera =
          cameras.find((c) =>
            c.label.toLowerCase().includes("back")
          ) ||
          cameras.find((c) =>
            c.label.toLowerCase().includes("rear")
          ) ||
          cameras[0]; // fallback (rare)

        await html5QrCode.start(
          backCamera.id,
          {
            fps: 5,
            qrbox: { width: 300, height: 120 },
          },
          onScanSuccess,
          () => {}
        );

        // ⏱ AUTO STOP SCAN
        timeoutRef.current = setTimeout(() => {
          stopScanning();
          setError("Scan timed out. Please try again.");
        }, SCAN_TIMEOUT_MS);
      } catch (err) {
        console.error(err);
        setError("Failed to access back camera");
        stopScanning();
      }
    };

    startScanner();

    return () => {
      stopScanning();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanning]);

  /* ---------------- SCAN HANDLER ---------------- */

  const onScanSuccess = (decodedText) => {
    // stability check
    if (decodedText === lastValueRef.current) {
      stableCountRef.current += 1;
    } else {
      lastValueRef.current = decodedText;
      stableCountRef.current = 1;
    }

    if (stableCountRef.current >= STABLE_READS_REQUIRED) {
      if (!ROLLNO_REGEX.test(decodedText)) {
        setError("Invalid roll number format");
        stopScanning();
        return;
      }

      setRollNo(decodedText);
      stopScanning();
    }
  };

  /* ---------------- STOP SCANNER ---------------- */

  const stopScanning = async () => {
    try {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (qrRef.current) {
        await qrRef.current.stop(); // ❗ DO NOT call clear()
        qrRef.current = null;
      }
    } catch {
      // already stopped
    }
    setScanning(false);
  };

  /* ---------------- FORM SUBMIT ---------------- */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rollNo) {
      setError("Scan your college ID first");
      return;
    }

    const data = {
      username: e.target.username.value.trim(),
      password: e.target.password.value,
      rollNo,
    };

    console.log("Signup data:", data);
    // 👉 send to backend
  };

  /* ---------------- UI ---------------- */

  return (
    <>
    <div className="min-h-screen flex flex-col gap-3 items-center justify-center p-4">
      <div className="w-full max-w-sm border rounded-lg p-6 border-[#570DF8]">
        <h1 className="text-xl font-semibold text-center mb-6">
        <a className="btn btn-ghost text-xl text-primary underline underline-offset-5 ">CONNECT</a>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="input input-bordered w-full border-[#570DF8]"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full border-[#570DF8]"
            required
          />

          <input
            type="text"
            value={rollNo}
            placeholder="Roll No (scan college ID)"
            className="input input-bordered w-full bg-gray-100 border-[#570DF8]"
            readOnly
          />

          {!scanning && (
            <button
              type="button"
              onClick={() => {
                lastValueRef.current = "";
                stableCountRef.current = 0;
                setRollNo("");
                setError("");
                setScanning(true);
              }}
              className="w-full border py-2 rounded hover:bg-gray-100 border-[#570DF8]"
            >
              {rollNo ? "Rescan College ID" : "Scan College ID"}
            </button>
          )}

          {scanning && (
            <button
              type="button"
              onClick={stopScanning}
              className="w-full border py-2 rounded text-red-600 hover:bg-red-50"
            >
              Stop Scanning
            </button>
          )}

          {/* CAMERA VIEW (ALWAYS MOUNTED) */}
          <div className="mt-4">
            <div id="barcode-scanner" />
          </div>

          <button
            type="submit"
            disabled={!rollNo || scanning}
            className={`w-full py-2 rounded text-white ${
              rollNo && !scanning
                ? "bg-[#570DF8] hover:bg-[#4b0ed6]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Sign Up
          </button>
        </form>

        {error && (
          <p className="text-xs text-center text-red-600 mt-3">
            {error}
          </p>
        )}

        <p className="text-xs text-center text-gray-500 mt-4">
          {/* Signup is allowed only via live scan using the back camera. */}
          {/* Forgot password? */}
          By signing up, you agree to our <a>terms and policy</a>
        </p>
      </div>
      <div className="w-full max-w-sm border rounded-lg p-3 flex justify-center gap-1 border-[#570DF8]">
        <span >Have an account? </span>
        <a>Login</a>
      </div>
    </div>
    </>
  );
}
