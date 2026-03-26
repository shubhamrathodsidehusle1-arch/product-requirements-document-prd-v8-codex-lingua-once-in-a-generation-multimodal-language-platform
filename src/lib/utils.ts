export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "N/A";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeTime(date: Date | string | null | undefined): string {
  if (!date) return "N/A";
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return formatDate(d);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function getLevelColor(level: string): string {
  if (level.startsWith("A1") || level === "N5" || level === "HSK1") return "text-green-400";
  if (level.startsWith("A2") || level === "N4" || level === "HSK2") return "text-yellow-400";
  if (level.startsWith("B1") || level === "N3" || level === "HSK3") return "text-orange-400";
  if (level.startsWith("B2") || level === "N2" || level === "HSK4") return "text-red-400";
  if (level.startsWith("C1") || level === "N1" || level === "HSK5") return "text-purple-400";
  if (level.startsWith("C2") || level === "HSK6") return "text-pink-400";
  return "text-slate-400";
}

export function getTierColor(tier: string): string {
  if (tier === "A") return "bg-brand-500/20 text-brand-400";
  if (tier === "B") return "bg-accent-500/20 text-accent-400";
  return "bg-slate-500/20 text-slate-400";
}

export function calculateStreak(lastActivity: Date | string | null): number {
  if (!lastActivity) return 0;
  const last = typeof lastActivity === "string" ? new Date(lastActivity) : lastActivity;
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - last.getTime()) / 86400000);
  return diffDays <= 1 ? diffDays + 1 : 0;
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

export function calculateXpForNextLevel(currentXp: number): number {
  const currentLevel = calculateLevel(currentXp);
  return currentLevel * 500 - currentXp;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function parseJsonField<T>(field: string | null | undefined, defaultValue: T): T {
  if (!field) return defaultValue;
  try {
    return JSON.parse(field) as T;
  } catch {
    return defaultValue;
  }
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}