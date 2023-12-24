const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const tailwindConfig = require('./src/css/tailwind.config.js');

module.exports = {
  plugins: [
    tailwind(tailwindConfig),
    autoprefixer,
  ],
};