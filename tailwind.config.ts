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
        blue: {
          base: "#384084",
          disabled: "rgba(56, 64, 132, 0.5)",
          selected: "#87CEEB",
        },
      },
      backgroundImage: {},
      height: {},
      animation: {},
    },
  },
  plugins: [],
};

export default config;
