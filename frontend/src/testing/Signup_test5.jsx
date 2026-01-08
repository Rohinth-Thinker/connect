import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function Signup_test5() {
  const [rollNo, setRollNo] = useState("");
  const [scanning, setScanning] = useState(false);

  const qrRef = useRef(null);

  // stability refs
  const lastValueRef = useRef("");
  const stableCountRef = useRef(0);

  useEffect(() => {
    if (!scanning) return;

    const startScanner = async () => {
      try {
        const html5QrCode = new Html5Qrcode("barcode-scanner");
        qrRef.current = html5QrCode;

        const cameras = await Html5Qrcode.getCameras();
        if (!cameras || cameras.length === 0) {
          alert("No camera found");
          setScanning(false);
          return;
        }

        // 🔥 FORCE BACK CAMERA ONLY
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
          (decodedText) => {
            // ---- stability logic ----
            if (decodedText === lastValueRef.current) {
              stableCountRef.current += 1;
            } else {
              lastValueRef.current = decodedText;
              stableCountRef.current = 1;
            }

            if (stableCountRef.current >= 2) {
              setRollNo(decodedText);
              stopScanning();
            }
          },
          () => {}
        );
      } catch (err) {
        console.error(err);
        alert("Failed to start back camera");
        setScanning(false);
      }
    };

    startScanner();

    return () => {
      stopScanning();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanning]);

  const stopScanning = async () => {
    try {
      if (qrRef.current) {
        await qrRef.current.stop();
        qrRef.current = null;
      }
    } catch (err) {
      console.warn("Scanner already stopped");
    }
    setScanning(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rollNo) {
      alert("Scan your college ID using back camera");
      return;
    }

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
      rollNo,
    };

    console.log(data);
    // send to backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm border rounded-lg p-6">
        <h1 className="text-xl font-semibold text-center mb-6">
          Signup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* USERNAME */}
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            required
          />

          {/* PASSWORD */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          {/* ROLL NUMBER */}
          <input
            type="text"
            value={rollNo}
            placeholder="Roll No (scan college ID)"
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />

          {/* SCAN BUTTON */}
          {!scanning && (
            <button
              type="button"
              onClick={() => {
                lastValueRef.current = "";
                stableCountRef.current = 0;
                setRollNo("");
                setScanning(true);
              }}
              className="w-full border py-2 rounded hover:bg-gray-100"
            >
              {rollNo ? "Rescan College ID" : "Scan College ID"}
            </button>
          )}

          {/* STOP BUTTON */}
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

          {/* SUBMIT */}
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

        <p className="text-xs text-center text-gray-500 mt-4">
          Signup is allowed only via live scan using the back camera.
        </p>
      </div>
    </div>
  );
}
