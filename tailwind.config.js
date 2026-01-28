/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        light: "Barlow_300Light",
        regular: "Barlow_400Regular",
        medium: "Barlow_500Medium",
        bold: "Barlow_700Bold",
        black: "Barlow_900Black",
      },
      colors: {
        primary: {
          DEFAULT: "#6C63FF",
          light: "#A29BFE",
          dark: "#4B42E0",
        },
        accent: "#8E2DE2",
        lavender: "#EDEBFF",
        "purple-text": "#3E2C8B",
        brand: {
          50: "#e0f7fb",
          100: "#b3ecf6",
          200: "#80e0f0",
          300: "#4dd4ea",
          400: "#26c9e4",
          500: "#06b6d4",
          600: "#059ab3",
          700: "#047a8f",
          800: "#035c6b",
          900: "#023d47",
        },
      },
    },
  },
  plugins: [],
};
