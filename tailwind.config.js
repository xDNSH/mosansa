module.exports = {
  content: ['./src/*.html','./src/**/*.html',"./node_modules/flowbite/**/*.js","./node_modules/aos/dist/aos.js"],
  theme: {
    extend: {
      colors: {
        primary: '#f70710',
        base: "#a25541",
        secondary: '#ffcb05',
        dark: {
          primary: '#f70710',
          base: "#a25541",
          secondary: '#ffcb05',
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
