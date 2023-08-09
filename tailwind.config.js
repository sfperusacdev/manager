/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#0C2131',
        subprimary: '#304250',
        secondary: '#EC7211',
        gris: '#DEDEDE',
        icongris: '#B1B1B1',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/typography'),
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
    // eslint-disable-next-line no-undef
    require('@tailwindcss/aspect-ratio'),
    // eslint-disable-next-line no-undef
    require('@tailwindcss/container-queries'),
    // eslint-disable-next-line no-undef
    require('tailwindcss-elevation'),
  ],
}
