import type { Config } from "tailwindcss";
type AccType = Record<string, string>;
const range = (start: number, end: number): number[] => {
  const array: number[] = [];
  for (let i = start; i <= end; ++i) {
    array.push(i);
  }
  return array;
};

const pxToRem = (px: number, base = 16) => `${px / base}rem`;
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    spacing: {
      ...range(0, 2000).reduce((acc: AccType, px: number) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    fontSize: {
      ...range(0, 2000).reduce((acc: AccType, px: number) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
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
    },
  },
  plugins: [],
};
export default config;
