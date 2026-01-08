import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

export default function Signup_test1() {
  const [rollNo, setRollNo] = useState("");
  const [scanning, setScanning] = useState(false);

  // refs for stability check
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
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );

    scanner.render(
      (decodedText) => {
        console.log(decodedText);
        // stability logic (NO validation)
        if (decodedText === lastValueRef.current) {
          stableCountRef.current += 1;
        } else {
          lastValueRef.current = decodedText;
          stableCountRef.current = 1;
        }

        // accept only if same value read twice
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

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scanning]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rollNo) {
      alert("Scan your college ID barcode first");
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

          {/* BARCODE RESULT */}
          <input
            type="text"
            value={rollNo}
            placeholder="Roll No (scan ID)"
            className="input input-bordered w-full bg-gray-100"
            readOnly
          />

          {/* SCAN BUTTON */}
          <button
            type="button"
            onClick={() => {
              lastValueRef.current = "";
              stableCountRef.current = 0;
              setScanning(true);
            }}
            className="w-full border py-2 rounded hover:bg-gray-100"
          >
            {rollNo ? "Rescan College ID" : "Scan College ID"}
          </button>

          {/* SCANNER */}
          {scanning && (
            <div className="mt-4">
              <div id="barcode-scanner" />
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-[#570DF8] text-white py-2 rounded hover:bg-[#4b0ed6]"
          >
            Sign Up
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-4">
          Only verified college students can sign up
        </p>
      </div>
    </div>
  );
}
