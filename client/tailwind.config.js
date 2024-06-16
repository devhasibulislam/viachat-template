/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        primary: "24px",
        secondary: "9999px",
        neutral: "5px",
      },
      colors: {
        primary: "#5A639C",
        secondary: "#219C90",
        neutral: "#102C57",
      },
      fontSize: {
        primary: "16px",
        secondary: "24px",
        neutral: "12px",
      },
      fontFamily: {
        primary: "Poppins",
        secondary: "Ubuntu",
        neutral: "Inter",
      },
      boxShadow: {
        primary: "0px 0px 24px rgba(90, 99, 156, 0.4)",
        secondary: "0px 0px 24px rgba(33, 156, 144, 0.4)",
        neutral: "0px 0px 24px rgba(16, 44, 87, 0.4)",
      },
      padding: {
        primary: "24px",
        secondary: "16px",
        neutral: "8px",
      },
      margin: {
        primary: "24px",
        secondary: "16px",
        neutral: "8px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
