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
        },
        scaleImg:{
          '0%': {transform: 'scale(1)'},
          '100%': {transform: 'scale(1.15)'}
        }
      },
      animation: {
        convertirEnCirculo: 'convertirEnCirculo 1.5s forwards',
        scaleImg: 'scaleImg 1.5s forwards'
      }
    },
  },
  plugins: [],
}

