/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
      title: ["Merriweather", ...defaultTheme.fontFamily.sans],
    },
    screens: {
      xss: "400px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      white: "#fff",
      yellow: {
        100: "#FBF3CA",
        200: "#F7E68E",
        300: "#F2D456",
        400: "#F0C12F",
      },
      orange: {
        100: "#FFF4E2",
        200: "#FFDAA8",
        300: "#FFC171",
        400: "#FF9933",
      },
      brown: {
        100: "#C89160",
        200: "#8B4513",
        300: "#743A13",
        400: "#421D06",
      },
      dark: {
        100: "#DEDEE1",
        200: "#86848F",
        300: "#444352",
        400: "#09051C",
      },
    },
    extend: {},
  },
  plugins: [],
};
