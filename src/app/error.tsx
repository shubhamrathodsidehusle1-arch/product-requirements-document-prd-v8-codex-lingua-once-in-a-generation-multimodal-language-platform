import Link from "next/link";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-surface-dark flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl mb-8">⚠️</div>
        <h1 className="text-4xl font-bold mb-4">
          <span className="gradient-text">500</span>
        </h1>
        <h2 className="text-xl text-slate-400 mb-8">Something went wrong</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => reset()}
            className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all"
          >
            Try Again
          </button>
          <Link 
            href="/" 
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}