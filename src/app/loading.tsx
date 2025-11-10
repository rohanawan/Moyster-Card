import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <LoadingSpinner size="lg" variant="white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Loading MoysterCard
        </h2>
        <p className="text-white text-opacity-70">Preparing your journey...</p>
      </div>
    </div>
  );
}
