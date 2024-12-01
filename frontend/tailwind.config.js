/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/daisyui/dist/**/*.js",
  ],
  themes: {
    daisyui: {
      themes: ["light", "dark", "cupcake", "bumblebee"],
    
    },
  },
  plugins: [
    daisyui,
  ],
}

