import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-dark flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl mb-8">🔍</div>
        <h1 className="text-4xl font-bold mb-4">
          <span className="gradient-text">404</span>
        </h1>
        <h2 className="text-xl text-slate-400 mb-8">Page Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/" 
            className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all"
          >
            Go Home
          </Link>
          <Link 
            href="/dashboard" 
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}