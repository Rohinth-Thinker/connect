import { useEffect, useRef, useState } from "react";
import {
  Html5QrcodeScanner,
  Html5QrcodeScanType,
} from "html5-qrcode";

export default function Signup_test3() {
  const [rollNo, setRollNo] = useState("");
  const [scanning, setScanning] = useState(false);
  const [cameraFacing, setCameraFacing] = useState(null); // "user" | "environment"

  // refs for scan stability
  const lastValueRef = useRef("");
  const stableCountRef = useRef(0);

  useEffect(() => {
    if (!scanning) return;

    const scanner = new Html5QrcodeScanner(
      "barcode-scanner",
      {
        fps: 5, // lower fps = more stable
        qrbox: { width: 300, height: 120 },
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA], // 🔒 camera only
      },
      false
    );

    scanner.render(
      (decodedText) => {
        console.log(decodedText);
        // ---- Stability logic (NO validation) ----
        if (decodedText === lastValueRef.current) {
          stableCountRef.current += 1;
        } else {
          lastValueRef.current = decodedText;
          stableCountRef.current = 1;
        }

        // Accept only if same value read twice
        if (stableCountRef.current >= 2) {
          setRollNo(decodedText);
          scanner.clear();
          setScanning(false);
        }
      },
      () => {
        // ignore scan errors
      }
    );

    // ---- Detect camera facing mode ----
    setTimeout(() => {
      const video = document.querySelector("#barcode-scanner video");
      if (!video) return;

      const stream = video.srcObject;
      if (!stream) return;

      const track = stream.getVideoTracks()[0];
      if (track.getCapabilities().focusMode) {
        track.applyConstraints({
            advanced: [{ focusMode: "continuous" }],
      });
        }
      const settings = track.getSettings();

      if (settings.facingMode) {
        setCameraFacing(settings.facingMode); // "user" or "environment"
      }
    }, 800);

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scanning]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (scanning) {
      alert("Finish scanning your college ID first");
      return;
    }

    if (!rollNo) {
      alert("Scan your college ID barcode to continue");
      return;
    }

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
      rollNo,
    };

    console.log("Signup data:", data);
    // TODO: send to backend
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

          {/* ROLL NUMBER (CAMERA ONLY) */}
          <input
            type="text"
            value={rollNo}
            placeholder="Roll No (scan college ID)"
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />

          {/* SCAN BUTTON */}
          <button
            type="button"
            disabled={scanning}
            onClick={() => {
              lastValueRef.current = "";
              stableCountRef.current = 0;
              setRollNo("");
              setCameraFacing(null);
              setScanning(true);
            }}
            className="w-full border py-2 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            {scanning
              ? "Scanning..."
              : rollNo
              ? "Rescan College ID"
              : "Scan College ID"}
          </button>

          {/* SCANNER */}
          {scanning && (
            <div
              className={`mt-4 ${
                cameraFacing === "user" ? "unmirror-video" : ""
              }`}
            >
              <div id="barcode-scanner" />
            </div>
          )}

          {/* FRONT CAMERA WARNING */}
          {cameraFacing === "user" && (
            <p className="text-xs text-yellow-600 text-center">
              Front camera detected — adjusting view for barcode scanning
            </p>
          )}

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
          Signup is allowed only via live camera scan of your college ID card.
        </p>
      </div>
    </div>
  );
}
