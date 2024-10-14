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

// module.exports = {
//   plugins: [require("taos/plugin")],
//   safelist: [
//     "!duration-[0ms]",
//     "!delay-[0ms]",
//     'html.js :where([class*="taos:"]:not(.taos-init))',
//   ],
// };

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      spacing: pxValues(2000), // For padding, margin, gap, etc.
      fontSize: pxValues(200), // For font-size
      height: pxValues(2000), // For height
      width: pxValues(2000), // For width
      borderWidth: pxValues(20), // For border-width
      borderRadius: pxValues(100), // For border-radius
      lineHeight: pxValues(200), // For line-height
      colors: {
        // 기본 색상 설정
        white: "#ffffff",
        black: "#000000",
        gray: {
          10: "#8C8787",
          20: "#424242",
          30: "#C4C4C4",
        },
        "neutral-black": "#1C1E22",
        "neutral-900": "#32363E",
        "neutral-800": "#494F5A",
        "neutral-700": "#636A79",
        "neutral-600": "#7E8695",
        "neutral-500": "#A0A5B1",
        "neutral-400": "#C1C5CD",
        "neutral-300": "#D2D5DA",
        "neutral-200": "#E0E2E6",
        "neutral-100": "#F3F5F7",
        "neutral-white": "#FDFDFD",
        "lavender-700": "#5636EB",
        "lavender-500": "#735AE9",
        "lavender-400": "#816EFF",
        "lavender-300": "#9686FF",
        "lavender-200": "#B3A5FF",
        "lavender-100": "#D8CEFF",
        "pink-800": "rgba(255, 194, 221, 0.20)",
        "pink-700": "#EB1164",
        "pink-500": "#FF3B86",
        "pink-400": "#FF60A0",
        "pink-300": "#FF79AF",
        "pink-200": "#FF97C7",
        "pink-100": "#FFC2DD",
        "turquoise-200": "#9EFFEF",
        "turquoise-100": "#BAFEF3",
        blue: {
          base: "#384084",
          disabled: "rgba(56, 64, 132, 0.5)",
          selected: "#87CEEB",
        },
        // 감정 색상 설정
        joy: "#FFFF9F", // 행복
        neutrality: "#C2FFBA", // 평온
        sadness: "#BCDEFF", // 슬픔
        anxiety: "#FFA44F", // 불안
        anger: "#FF9796", // 화남
        fatigue: "#B0B0B0", // 피곤
      },
      backgroundImage: {},

      animation: {},
    },
  },
  plugins: [],
};

export default config;
