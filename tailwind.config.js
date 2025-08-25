/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
module.exports = {
  darkMode: 'class', // or 'media'
}
<html class="dark">
<div class="bg-white text-black dark:bg-black dark:text-white">
  Themed Content
</div>
