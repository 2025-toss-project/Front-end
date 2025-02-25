/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 메인 색상
        main: {
          DEFAULT: "#C80150", // 빨간색
          second: "#008B8B", // 초록색
        },
        // 회색
        second: {
          DEFAULT: "#AAAAAA",
          light: "#D9D9D9",
          lighter: "#F4F4F5",
        },
        // 마커들의 색상 DEFAULT -> border, light -> fill
        "marker-food": {
          DEFAULT: "#AAD6FF",
          light: "#E9F1F8",
        },
        "marker-home": {
          DEFAULT: "#007FF2",
          light: "#CCE5FC",
        },
        "marker-traffic": {
          DEFAULT: "#2D67D5",
          light: "#D5E1F7",
        },
        "marker-com": {
          DEFAULT: "#23B169",
          light: "#D3EFE1",
        },
        "marker-health": {
          DEFAULT: "#77CEBD",
          light: "#E4F5F2",
        },
        "marker-shopping": {
          DEFAULT: "#EF4452",
          light: "#FCDADC",
        },
        "marker-education": {
          DEFAULT: "#FD9F2C",
          light: "#FFECD5",
        },
        "marker-hobby": {
          DEFAULT: "#A064FF",
          light: "#ECE0FF",
        },
        "marker-saving": {
          DEFAULT: "#FFC522",
          light: "#FFF3D3",
        },
        "marker-event": {
          DEFAULT: "#BFBFBF",
          light: "#F2F2F2",
        },
        "marker-etc": {
          DEFAULT: "#86584A",
          light: "#E7DEDB",
        },
      },
    },
  },
  plugins: [],
};
