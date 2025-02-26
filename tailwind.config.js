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
          dark: "#333333",
          light: "#D9D9D9",
          lighter: "#F4F4F5",
          lightest: "#EEEEEE,",
        },
        // 마커들의 색상 DEFAULT -> border, light -> fill
        // 식비
        "marker-food": {
          DEFAULT: "#AAD6FF",
          light: "#E9F1F8",
        },
        // 주거
        "marker-home": {
          DEFAULT: "#007FF2",
          light: "#CCE5FC",
        },
        // 교통
        "marker-traffic": {
          DEFAULT: "#2D67D5",
          light: "#D5E1F7",
        },
        // 통신
        "marker-com": {
          DEFAULT: "#23B169",
          light: "#D3EFE1",
        },
        // 건강
        "marker-health": {
          DEFAULT: "#77CEBD",
          light: "#E4F5F2",
        },
        // 쇼핑
        "marker-shopping": {
          DEFAULT: "#EF4452",
          light: "#FCDADC",
        },
        // 교육
        "marker-education": {
          DEFAULT: "#FD9F2C",
          light: "#FFECD5",
        },
        // 문화생활
        "marker-hobby": {
          DEFAULT: "#A064FF",
          light: "#ECE0FF",
        },
        // 저축
        "marker-saving": {
          DEFAULT: "#FFC522",
          light: "#FFF3D3",
        },
        // 경조사
        "marker-event": {
          DEFAULT: "#BFBFBF",
          light: "#F2F2F2",
        },
        // 기타
        "marker-etc": {
          DEFAULT: "#86584A",
          light: "#E7DEDB",
        },
        //
      },
      dropShadow: {
        5: "0 16px 40px rgba(0, 0, 0, 0.05)",
        10: "4px 4px 4px rgba(0, 0, 0, 0.10)",
        50: "0 2px 4px rgba(0, 0, 0, 0.50)",
      },
      borderRadius: {
        "2.5xl": "20px",
      },
    },
  },
  plugins: [],
};
