/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          100: "#F9FAFC",
          200: "#F1F2F6",
          300: "#E0E5EB",
          400: "#D2D6E1",
          500: "#BFC9D5",
          600: "#818DA4",
          700: "#666F84",
          800: "#373E4E",
          900: "#222631",
          950: "#0A0F15",
        },
        purple: {
          default: "#7647EF",
          deep: "#5B31C7",
          lite: "#A380FF",
        },
        yellow: {
          enabled: "#F2D39A",
          disabled: "#FFF3DE",
        },
        etc: {
          green: "#0AA06E",
          sky: "#A9D6FF",
        }
      }
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
}

