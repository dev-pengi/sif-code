/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        vsm: "600px",
        vmd: "700px",
      },
      colors: {
        primary: "#3498db",
        "dark-blue": "#222535",
        "dark-tab": "#181818",
        "dark-active-tab": "#1f1f1f",
        "light-tab": "#f8f8f8",
        "light-active-tab": "#ffffff",
        dark: "#343436",
      },
      spacing: {
        navD: "60px",
      },
      boxShadow: {
        headerShadow: "rgba(0, 0, 0, 0.03) 0px 10px 50px;",
      },
    },
  },
  plugins: [],
};
