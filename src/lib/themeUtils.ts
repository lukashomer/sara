export const COLORS_MAP = {
  // Primary colors
  blue: "#3B82F6",
  red: "#EF4444",
  green: "#10B981",
  orange: "#F59E0B",
  purple: "#8B5CF6",

  // Secondary colors
  pink: "#EC4899",
  cyan: "#06B6D4",
  deepOrange: "#F97316",
  lime: "#84CC16",
  indigo: "#6366F1",

  // Pastel colors
  lightBlue: "#93C5FD",
  lightRed: "#FCA5A5",
  lightGreen: "#86EFAC",
  lightYellow: "#FCD34D",
  lightPurple: "#C4B5FD",

  // Muted colors
  slate: "#64748B",
  lightSlate: "#94A3B8",
  darkSlate: "#475569",
  darkerSlate: "#334155",
  darkestSlate: "#1E293B",
} as const;

// create 20 nice colors
export const COLORS = Object.values(COLORS_MAP);
