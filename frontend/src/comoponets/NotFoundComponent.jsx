import { SearchX } from "lucide-react";

function NotFoundComponent({ 
  title = "Item not found", 
  description = "The item you're looking for doesn't exist or was removed.",
  showAction = false,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      
      <div className="bg-[#570DF8] p-5 rounded-full mb-4">
        <SearchX className="w-10 h-10 text-white"/>
      </div>

      <h2 className="text-2xl font-semibold text-primary">{title}</h2>

      <p className="text-base-content/70 mt-2 max-w-md">
        {description}
      </p>

      {showAction && (
        <button 
          onClick={onAction}
          className="btn btn-primary mt-5"
        >
          Go Back
        </button>
      )}
    </div>
  );
}

export default NotFoundComponent;