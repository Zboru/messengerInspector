module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      screens: {
        md: '850px'
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
