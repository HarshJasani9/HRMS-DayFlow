export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "hrms-theme";

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

import { flushSync } from "react-dom";

/**
 * Apply a theme using the View Transitions API for a circle-spread animation.
 * Falls back to instant application on unsupported browsers.
 */
export function applyThemeWithTransition(
  theme: ThemeMode,
  e?: React.MouseEvent<HTMLButtonElement>,
  updateReactState?: () => void
): void {
  if (!document.startViewTransition) {
    applyTheme(theme);
    updateReactState?.();
    return;
  }

  // Calculate coordinates for the circle spread
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  if (e?.currentTarget) {
    const rect = e.currentTarget.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  } else if (e?.clientX) {
    x = e.clientX;
    y = e.clientY;
  }

  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = document.startViewTransition(() => {
    if (updateReactState) {
      flushSync(() => {
        applyTheme(theme);
        updateReactState();
      });
    } else {
      applyTheme(theme);
    }
  });

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 400,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  });
}

export function applyLightTheme(): void {
  applyTheme("light");
}

export function persistTheme(theme: ThemeMode): void {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}
