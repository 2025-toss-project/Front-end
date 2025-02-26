import React from "react";
import { IconProps } from "../../constants/category";

const IconCom: React.FC<IconProps> = ({ color, size = 20 }) => {
  const defaultColor = "#23B169";
  const whiteColor = "#FFFFFF";
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_241_3428)">
        <path
          d="M5.57551 14.4243C9.65001 18.4988 12.7405 19.4263 15.2025 18.8403C16.5695 18.5148 17.788 17.4013 18.602 16.4748C19.219 15.7718 19.1025 14.6908 18.3625 14.1183L15.1075 11.5993C14.7825 11.3478 14.321 11.3768 14.03 11.6678L12.3015 13.3963C12.0345 13.6633 11.623 13.7163 11.3015 13.5188C10.746 13.1778 9.81401 12.5168 8.64901 11.3513C7.48401 10.1863 6.82301 9.25434 6.48151 8.69884C6.28401 8.37734 6.33701 7.96584 6.60401 7.69884L8.33251 5.97034C8.62301 5.67984 8.65251 5.21834 8.40101 4.89284L5.88201 1.63784C5.30951 0.897838 4.22801 0.781338 3.52551 1.39834C2.59901 2.21184 1.48551 3.43034 1.16001 4.79784C0.574011 7.26034 1.50151 10.3503 5.57601 14.4248L5.57551 14.4243Z"
          fill={color === "white" ? whiteColor : defaultColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_241_3428">
          <rect width={size} height={size} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconCom;
