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
        /* ── Legacy semantic tokens (keep for backward compat) ── */
        ink: "#17211d",
        surface: "#f6f7f5",
        line: "#dfe5df",
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
        soft: "0 12px 30px rgba(23, 33, 29, 0.08)",
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        header: "var(--shadow-header)"
      }
    }
  },
  plugins: []
};

export default config;
