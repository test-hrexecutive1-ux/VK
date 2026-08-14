export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton rounded-sm ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[3/4] w-full" />
      <Skeleton className="h-4 w-2/3 mt-4" />
      <Skeleton className="h-3 w-1/3 mt-2" />
    </div>
  );
}
