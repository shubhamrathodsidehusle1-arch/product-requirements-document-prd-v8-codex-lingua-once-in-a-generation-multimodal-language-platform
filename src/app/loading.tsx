export default function Loading() {
  return (
    <div className="min-h-screen bg-surface-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-3xl font-bold mx-auto mb-4 animate-pulse">
          C
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-3 h-3 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-3 h-3 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="text-slate-400 mt-4">Loading...</p>
      </div>
    </div>
  );
}