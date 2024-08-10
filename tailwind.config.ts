import type { Config } from "tailwindcss";

type AccType = Record<string, string>;

const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

const pxValues = (end: number): AccType => {
  return range(0, end).reduce((acc: AccType, px: number) => {
    acc[`${px}`] = `${px}px`;
    return acc;
  }, {});
};

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    spacing: pxValues(2000), // For padding, margin, gap, etc.
    fontSize: pxValues(200), // For font-size
    height: pxValues(2000), // For height
    width: pxValues(2000), // For width
    borderWidth: pxValues(20), // For border-width
    borderRadius: pxValues(100), // For border-radius
    lineHeight: pxValues(200), // For line-height
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        gray: {
          10: "#8C8787",
          20: "#424242",
          30: "#C4C4C4",
        },
      },
      backgroundImage: {
        "gradient-to-b":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0) , rgba(0, 0, 0, 1))",
      },
      height: {
        exceptNav: "calc(100vh - 3rem)",
      },
      animation: {
        slide: "slide 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
