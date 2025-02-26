import React from "react";
import { IconProps } from "../../constants/category";

const IconEtc: React.FC<IconProps> = ({ color, size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_241_3495)">
        <path
          d="M17.0835 4.96729H2.9165C1.996 4.96729 1.25 5.71329 1.25 6.63379V15.8003C1.25 16.7208 1.996 17.4668 2.9165 17.4668H17.083C18.0035 17.4668 18.7495 16.7203 18.7495 15.8003V6.63379C18.7495 5.71329 18.004 4.96729 17.0835 4.96729Z"
          fill={color === "white" ? "#FFFFFF" : "#86584A"}
        />
        <path
          d="M14.0835 4.96719H12.5835V3.37869C12.5835 3.32619 12.541 3.28369 12.4885 3.28369H7.51199C7.45949 3.28369 7.41699 3.32619 7.41699 3.37869V4.96719H5.91699V3.37869C5.91699 2.49919 6.63249 1.78369 7.51199 1.78369H12.4885C13.368 1.78369 14.0835 2.49919 14.0835 3.37869V4.96719Z"
          fill={color === "white" ? "#FFFFFF" : "#4E5968"}
        />
        <path
          d="M5.876 4.9668H4.495V17.4668H5.876V4.9668Z"
          fill={color === "white" ? "#FFFFFF" : "#5E403B"}
        />
        <path
          d="M15.505 4.9668H14.124V17.4668H15.505V4.9668Z"
          fill={color === "white" ? "#FFFFFF" : "#5E403B"}
        />
      </g>
      <defs>
        <clipPath id="clip0_241_3495">
          <rect width={size} height={size} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconEtc;
