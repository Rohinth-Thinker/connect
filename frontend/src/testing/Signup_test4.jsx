import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const SCAN_TIMEOUT_MS = 15000;
const STABLE_READS_REQUIRED = 2;
const ROLLNO_REGEX = /^\d{2}[A-Z]\d{4}$/;

export default function Signup() {
  const [rollNo, setRollNo] = useState("");
  const [scanning, setScanning] = useState(false);
  const [starting, setStarting] = useState(false); // 🔥 NEW
  const [verified, setVerified] = useState(false); // 🔥 NEW
  const [error, setError] = useState("");

  const qrRef = useRef(null);
  const timeoutRef = useRef(null);

  const lastValueRef = useRef("");
  const stableCountRef = useRef(0);

  /* ---------------- SCANNER ---------------- */

  useEffect(() => {
    if (!scanning) return;

    const startScanner = async () => {
      try {
        setStarting(true);

        const html5QrCode = new Html5Qrcode("barcode-scanner");
        qrRef.current = html5QrCode;

        const cameras = await Html5Qrcode.getCameras();
        if (!cameras.length) throw new Error("No camera");

        const backCamera =
          cameras.find(c => c.label.toLowerCase().includes("back")) ||
          cameras.find(c => c.label.toLowerCase().includes("rear")) ||
          cameras[0];

        await html5QrCode.start(
          backCamera.id,
          { fps: 5, qrbox: { width: 300, height: 120 } },
          onScanSuccess,
          () => {}
        );

        timeoutRef.current = setTimeout(() => {
          stopScanning();
          setError("Scan timed out. Try again.");
        }, SCAN_TIMEOUT_MS);

      } catch (err) {
        console.error(err);
        setError("Failed to access back camera");
        stopScanning();
      } finally {
        setStarting(false);
      }
    };

    startScanner();

    return () => stopScanning();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanning]);

  /* ---------------- SCAN HANDLER ---------------- */

  const onScanSuccess = (decodedText) => {
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
      setVerified(true); // ✅ VERIFIED
      stopScanning();
    }
  };

  /* ---------------- STOP ---------------- */

  const stopScanning = async () => {
    try {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (qrRef.current) {
        await qrRef.current.stop();
        qrRef.current = null;
      }
    } catch {}
    setScanning(false);
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rollNo) {
      setError("Scan your college ID to continue");
      return;
    }

    const data = {
      username: e.target.username.value.trim(),
      password: e.target.password.value,
      rollNo,
    };

    console.log("Signup:", data);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-sm bg-base-100 rounded-xl shadow-md p-6 space-y-5 border border-[#570DF8]">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#570DF8] underline underline-offset-4">
            CONNECT
          </h1>
          <p className="text-sm text-gray-500">
            College-only verified signup
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            className="input input-bordered w-full outline-[#570DF8]"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full outline-[#570DF8]"
            required
          />

          {/* VERIFY BOX */}
          <div className="border border-dashed border-[#570DF8] rounded-lg p-4 bg-[#f6f3ff] space-y-3 relative">

            <div className="flex items-center gap-2 font-semibold text-[#570DF8]">
              🔒 Verify College ID
              {verified && <span className="text-green-600">✔ Verified</span>}
            </div>

            <p className="text-xs text-gray-600">
              Scan your physical college ID using the back camera.
            </p>

            {!scanning && (
              <button
                type="button"
                onClick={() => {
                  lastValueRef.current = "";
                  stableCountRef.current = 0;
                  setRollNo("");
                  setVerified(false);
                  setError("");
                  setScanning(true);
                }}
                className="w-full border border-[#570DF8] text-[#570DF8] py-2 rounded-lg hover:bg-[#570DF8] hover:text-white transition"
              >
                {rollNo ? "Rescan College ID" : "Scan College ID"}
              </button>
            )}

            {scanning && (
              <button
                type="button"
                onClick={stopScanning}
                className="w-full border py-2 rounded-lg text-red-600 hover:bg-red-50"
              >
                Stop Scanning
              </button>
            )}

            <input
              value={rollNo}
              placeholder="Roll No (auto-filled)"
              className="input input-bordered w-full bg-gray-100"
              readOnly
            />

            {/* LOADING OVERLAY */}
            {starting && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                <span className="loading loading-spinner text-primary"></span>
                <span className="ml-2 text-sm">Starting camera…</span>
              </div>
            )}
          </div>

          {/* CAMERA */}
          <div id="barcode-scanner" />

          <button
            type="submit"
            disabled={!rollNo || scanning}
            className={`w-full py-2 rounded-lg text-white ${
              rollNo && !scanning
                ? "bg-[#570DF8] hover:bg-[#4b0ed6]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Sign Up
          </button>
        </form>

        {error && (
          <p className="text-xs text-center text-red-600">{error}</p>
        )}

        <div className="text-center text-sm pt-3 border-t">
          Have an account?
          <a className="ml-1 text-[#570DF8] font-medium hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
