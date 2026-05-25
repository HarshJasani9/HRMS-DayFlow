"use client";

import { Moon, Sun } from "lucide-react";
import type { ThemeMode } from "@/lib/theme";

type ThemeToggleProps = {
  theme: ThemeMode;
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

/**
 * Animated theme toggle button with Sun/Moon icons.
 *
 * Uses CSS transforms for a smooth rotation + scale effect
 * on each toggle. The active icon fades in while the
 * inactive one fades out via opacity and rotation.
 */
export function ThemeToggle({ theme, onToggle, className = "" }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      className={`
        relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-md
        border border-border bg-card text-text-secondary shadow-sm
        transition-transform hover:-translate-y-0.5 hover:border-border-strong
        hover:bg-card-hover hover:text-heading
        sm:h-9 sm:w-9
        ${className}
      `}
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun icon — visible in dark mode (click to go light) */}
      <Sun
        size={18}
        aria-hidden="true"
        className={`
          absolute transition-all duration-300 ease-in-out
          ${isDark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
          }
        `}
      />

      {/* Moon icon — visible in light mode (click to go dark) */}
      <Moon
        size={18}
        aria-hidden="true"
        className={`
          absolute transition-all duration-300 ease-in-out
          ${isDark
            ? "-rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
          }
        `}
      />
    </button>
  );
}

/**
 * A wrapper around ThemeToggle that automatically manages the theme state.
 * Useful for dropping into isolated pages (landing, auth) where you don't
 * already have a global layout state managing the theme.
 */
import { useEffect, useState } from "react";
import { getPreferredTheme, persistTheme, applyThemeWithTransition } from "@/lib/theme";

export function GlobalThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getPreferredTheme());
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch by returning a placeholder of the exact same size
    return <div className={`h-10 w-10 sm:h-9 sm:w-9 shrink-0 ${className ?? ""}`} />;
  }

  function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    const nextTheme = theme === "dark" ? "light" : "dark";
    persistTheme(nextTheme);
    applyThemeWithTransition(nextTheme, e, () => {
      setTheme(nextTheme);
    });
  }

  return <ThemeToggle theme={theme} onToggle={handleToggle} className={className} />;
}
