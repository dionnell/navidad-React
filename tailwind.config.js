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
            borderRadius: '100%' /* Termina como círculo */
          }
        },
        scaleImg:{
          '0%': {transform: 'scale(1)'},
          '100%': {transform: 'scale(1.15)'}
        },
        textEffect:{
          '0%': { transform: 'translateX(100%)' }, 
          '25%': { transform: 'translateX(50%)' },
          '50%': { transform: 'translateX(0%)' },
          '75%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        convertirEnCirculo: 'convertirEnCirculo 1.5s forwards',
        scaleImg: 'scaleImg 1.5s forwards',
        textEffect: 'textEffect 1.5s '
      }
    },
  },
  plugins: [],
}

