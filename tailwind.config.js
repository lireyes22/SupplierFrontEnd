import tailwindcssPrimeui from 'tailwindcss-primeui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1921px', // Define un nuevo breakpoint llamado "3xl" a partir de 1921px
      },
    },
  },
  plugins: [tailwindcssPrimeui],
}

