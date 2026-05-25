export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "hrms-theme";

const TRANSITION_CLASS = "theme-transitioning";
const TRANSITION_DURATION_MS = 250;

export function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark";
}

export function getPreferredTheme(): ThemeMode {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (isThemeMode(storedTheme)) {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Apply a theme immediately (no transition).
 * Used on initial page load to prevent flash-of-wrong-theme.
 */
export function applyTheme(theme: ThemeMode): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

/**
 * Apply a theme with a smooth CSS transition.
 * Adds the `.theme-transitioning` class to enable transitions
 * on background, color, and border properties, then removes
 * it after the transition completes to keep normal interactions snappy.
 */
export function applyThemeWithTransition(theme: ThemeMode): void {
  document.documentElement.classList.add(TRANSITION_CLASS);
  applyTheme(theme);

  window.setTimeout(() => {
    document.documentElement.classList.remove(TRANSITION_CLASS);
  }, TRANSITION_DURATION_MS);
}

export function applyLightTheme(): void {
  applyTheme("light");
}

export function persistTheme(theme: ThemeMode): void {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}
