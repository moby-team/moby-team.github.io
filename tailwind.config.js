/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        'light-aqua': '#B8E2F0',
        'bg-gray': '#1F2123'
      },
    },
  },
  plugins: [],
}

