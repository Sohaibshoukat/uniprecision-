/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Head": "Bebas Neue",
        "Lora": `"Lora", serif`,
        "Para": '"Poppins", sans-serif'
      },
      backgroundColor: {
        "darkblue": "#0c4884",
        "lightblue": "#00afee",
        "sideblue": "#0f77be"
      },
      textColor: {
        "darkblue": "#0c4884",
        "lightblue": "#00afee",
        "sideblue": "#0f77be"
      },
      borderColor: {
        "darkblue": "#0c4884",
        "lightblue": "#00afee",
        "sideblue": "#0f77be"
      }
    },
  },
  plugins: [],
}

