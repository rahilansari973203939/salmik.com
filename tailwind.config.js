/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#10B981",
        "brand-dark": "#059669",
        "brand-light": "#ECFDF5",
        accent: "#F59E0B",
        "accent-dark": "#D97706",
        "accent-light": "#FFFBEB",
        ink: "#0F172A",
        cream: "#F8FAFC",
        paper: "#FFFFFF",
      },
      boxShadow: {
        soft: "0 20px 45px -25px rgba(16, 185, 129, 0.45)",
        glow: "0 12px 30px -12px rgba(245, 158, 11, 0.55)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-fraunces)", "ui-serif", "serif"],
      },
    },
  },
  plugins: [],
};
