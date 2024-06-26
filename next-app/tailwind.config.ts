import withMT from "@material-tailwind/react/utils/withMT";

const config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "440px",
      },
      animation: {
        "spin-slow": "spin 1.5s linear infinite",
      },
      fontFamily: {
        red: ["Red Hat Display", "sans-serif"],
      },
    },
  },
  plugins: [],
});

export default config;
