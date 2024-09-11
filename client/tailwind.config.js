/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/pages/*.jsx", "./index.html", "./src/components/*.jsx"],
  theme: {
    extend: {
      height: {
        screen: "calc(var(--vh, 1vh) * 100)",
      },
    },
  },
  plugins: [],
};
