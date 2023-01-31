/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "go-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(-0%)"},
        },
        "go-out": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
    },
    animation: {
      "go-in": "go-in 1.5s ease-out",
      "go-out": "go-out 0.5s ease-out",
    },
  },
  plugins: [],
}
}