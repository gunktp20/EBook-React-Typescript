/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: { 
        min: "0px",
       max: "600px" },

      md: { 
        min: "601px", 
        max: "1023px" },

      lg: { 
        min: "1024px", 
        max: "1279px" },

      xl: { 
        min: "1280px", 
        max: "1535px" },
      "2xl":{
        min:"1535",
        max:"3150px"
      }

    },
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'primary': {
         50: '#ecf4ff',
        100: '#c4defe',
        200: '#a8cefe',
        300: '#80b8fd',
        400: '#67aafd',
        500: '#4195fc',
        600: '#3b88e5',
        700: '#2e6ab3',
        800: '#24528b',
        900: '#1b3f6a',
      },
      'gray':{
         50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#030712',
      }
    }
  },
  darkMode: false,
}
