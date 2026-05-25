import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        /* ── Legacy semantic tokens (mapped to theme vars for backward compat) ── */
        ink: "var(--color-heading)",
        surface: "var(--color-surface)",
        line: "var(--color-border)",
        brand: {
          50: "var(--color-brand-50)",
          100: "var(--color-brand-100)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)"
        },

        /* ── Theme-aware semantic tokens ── */
        page: "var(--color-page)",
        "page-alt": "var(--color-page-alt)",

        card: "var(--color-card)",
        "card-hover": "var(--color-card-hover)",
        "card-raised": "var(--color-card-raised)",

        sidebar: "var(--color-sidebar)",
        "sidebar-item": "var(--color-sidebar-item)",

        "header-bg": "var(--color-header)",

        input: "var(--color-input)",
        "input-focus": "var(--color-input-focus)",

        border: "var(--color-border)",
        "border-light": "var(--color-border-light)",
        "border-strong": "var(--color-border-strong)",

        heading: "var(--color-heading)",
        "text-primary": "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "text-faint": "var(--color-text-faint)",

        hover: "var(--color-hover)",
        active: "var(--color-active)",
        overlay: "var(--color-overlay)",

        /* ── Status tokens ── */
        "success-bg": "var(--color-success-bg)",
        "success-text": "var(--color-success-text)",
        "warning-bg": "var(--color-warning-bg)",
        "warning-text": "var(--color-warning-text)",
        "error-bg": "var(--color-error-bg)",
        "error-text": "var(--color-error-text)",
        "info-bg": "var(--color-info-bg)",
        "info-text": "var(--color-info-text)"
      },
      boxShadow: {
        soft: "var(--shadow-card)",
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        header: "var(--shadow-header)"
      }
    }
  },
  plugins: []
};

export default config;
