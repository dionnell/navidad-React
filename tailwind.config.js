/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        convertirEnCirculo: {
          '0%': {
            borderRadius: '5%'  /* Comienza como cuadrado */
          },
          '100%': {
            borderRadius: '50%' /* Termina como círculo */
          }
        }
      },
      animation: {
        convertirEnCirculo: 'convertirEnCirculo 1.5s forwards',
      }
    },
  },
  plugins: [],
}

