import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-2 w-10/12 h-10/12 md:grid-cols-2 lg:grid-cols-3 xl:w-2/3 gap-4 mt-6 p-4">
      {[...Array(6)].map((_, index) => (
        <div key={index}>
          <Skeleton className="w-full h-80 bg-zinc-500 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
