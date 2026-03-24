
export default function LoadingComponent({ text = "Loading...", color = "text-gray-600" }) {
  return (
    <div className="flex items-center justify-center gap-3 h-full">
      {/* Spinner */}
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />

      {/* Text */}
      <span className={`text-sm ${color}`}>{text}</span>
    </div>
  );
}
