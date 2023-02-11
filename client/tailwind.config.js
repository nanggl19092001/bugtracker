/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {
        'primary-nav':'rgb(17, 24, 38)',
        'bg-nav':'rgb(31, 41, 54)',
        'text-color':'rgb(148, 153, 162)',
      },
      keyframes: {
        "go-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)"},
        },
        "go-out": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
    },
    animation: {
      "go-in": "go-in 1s ease-out",
      "go-out": "go-out 0.5s ease-out",
    },
  },
  plugins: [],
}
}