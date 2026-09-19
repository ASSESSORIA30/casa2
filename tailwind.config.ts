import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F5EF",
        stone: { 50: "#F2EEE6", 100: "#E9E3D7", 200: "#DDD5C5", 300: "#C9BFAB" },
        sand: "#D6C9B0",
        warm: { 400: "#A39A8E", 500: "#8A8175", 600: "#6E665C" },
        charcoal: "#24211E",
        bronze: { DEFAULT: "#A98B66", dark: "#8A6F4E" },
      },
      fontFamily: {
        sans: ['"Manrope Variable"', "system-ui", "sans-serif"],
        serif: ['"Cormorant Variable"', "Georgia", "serif"],
      },
      letterSpacing: { wider2: "0.18em" },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        slow: { from: { transform: "scale(1.06)" }, to: { transform: "scale(1)" } },
      },
      animation: { rise: "rise .9s cubic-bezier(.2,.7,.2,1) both", slow: "slow 2.4s ease-out both" },
    },
  },
  plugins: [],
};
export default config;
