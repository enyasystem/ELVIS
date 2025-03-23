import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-jeason-primary" />
        <p className="text-lg text-steel-gray">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
