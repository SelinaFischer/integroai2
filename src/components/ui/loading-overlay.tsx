import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

const LoadingOverlay = ({ 
  message = "Loading...", 
  fullScreen = false,
  className 
}: LoadingOverlayProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        fullScreen ? "fixed inset-0 bg-background/80 backdrop-blur-sm z-50" : "py-12",
        className
      )}
    >
      <Spinner size="lg" />
      <p className="text-muted-foreground text-sm animate-pulse">{message}</p>
    </div>
  );
};

export { LoadingOverlay };
