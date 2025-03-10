import React from "react";
import { IconProps } from "../../constants/category";

const IconAll: React.FC<IconProps> = ({ color, size = 22 }) => {
  const defaultColor = "#AFB7C0";
  const whiteColor = "#FFFFFF";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_721_1632)">
        <path
          d="M14.75 1.75H6.25C4.041 1.75 2.25 3.541 2.25 5.75V14.25C2.25 16.459 4.041 18.25 6.25 18.25H14.75C16.959 18.25 18.75 16.459 18.75 14.25V5.75C18.75 3.541 16.959 1.75 14.75 1.75ZM16.95 14.25C16.95 15.463 15.963 16.45 14.75 16.45H6.25C5.037 16.45 4.05 15.463 4.05 14.25V5.75C4.05 4.537 5.037 3.55 6.25 3.55H14.75C15.963 3.55 16.95 4.537 16.95 5.75V14.25Z"
          fill={color === "white" ? whiteColor : defaultColor}
        />
        <path
          d="M9.54052 5.55127L6.22852 14.5043H8.20852L8.92852 12.4283H12.0725L12.7805 14.5043H14.761L11.4605 5.55127H9.54052ZM9.49252 10.8198L10.5125 7.87977L11.521 10.8198H9.49252Z"
          fill={color === "white" ? whiteColor : defaultColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_721_1632">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconAll;
