import { Skeleton } from "@/components/ui/skeleton";

interface CardSkeletonProps {
  showImage?: boolean;
}

const CardSkeleton = ({ showImage = false }: CardSkeletonProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
      {/* Gradient header bar */}
      <div className="h-2 bg-gradient-to-r from-muted via-muted/80 to-muted" />
      
      {showImage && <Skeleton className="w-full h-48" />}
      
      <div className="p-6 space-y-4">
        {/* Meta info skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Title skeleton */}
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />

        {/* Excerpt skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Link skeleton */}
        <Skeleton className="h-4 w-28 mt-2" />
      </div>
    </div>
  );
};

const CardSkeletonGrid = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};

export { CardSkeleton, CardSkeletonGrid };
