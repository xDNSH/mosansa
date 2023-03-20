module.exports = {
  content: ['./src/*.html', './src/**/*.html', './node_modules/flowbite/**/*.js', './node_modules/aos/dist/aos.js'],
  theme: {
    extend: {
      colors: {
        'mpk': {  DEFAULT: '#792324',  50: '#D97B7C',  100: '#D46B6C',  200: '#CB4B4D',  300: '#B83537',  400: '#992C2D',  500: '#792324',  600: '#4D1617',  700: '#220A0A',  800: '#000000',  900: '#000000'},
        'osis': {  DEFAULT: '#9C7344',  50: '#E0CDB8',  100: '#DAC3A9',  200: '#CDAF8D',  300: '#C19C71',  400: '#B58854',  500: '#9C7344',  600: '#755633',  700: '#4E3922',  800: '#271D11',  900: '#000000'},
      },
    },
  },
  plugins: [require('daisyui')],
};
