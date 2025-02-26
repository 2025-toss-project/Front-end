import React from "react";
import { IconProps } from "../../constants/category";

const IconShopping: React.FC<IconProps> = ({ color, size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_241_3443)">
        <path
          d="M12.826 7.97749C12.488 7.97749 12.214 7.70349 12.214 7.36549V4.47999C12.214 3.25899 11.221 2.26549 9.99951 2.26549C8.77801 2.26549 7.785 3.25899 7.785 4.47999V7.36549C7.785 7.70349 7.511 7.97749 7.173 7.97749C6.835 7.97749 6.561 7.70349 6.561 7.36549V4.47999C6.561 2.58399 8.1035 1.04199 9.999 1.04199C11.8945 1.04199 13.437 2.58399 13.437 4.47999V7.36549C13.437 7.70349 13.163 7.97749 12.825 7.97749H12.826Z"
          fill={color === "white" ? "#FFFFFF" : "#4E5968"}
        />
        <path
          d="M15.316 4.47998H4.684C4.2815 4.47998 3.9395 4.77348 3.878 5.17098L2.279 15.5255C2.05 17.008 3.197 18.346 4.697 18.346H15.302C16.802 18.346 17.949 17.0085 17.72 15.5255L16.121 5.17098C16.0595 4.77348 15.7175 4.47998 15.315 4.47998H15.316Z"
          fill={color === "white" ? "#FFFFFF" : "#EF4452"}
        />
      </g>
      <defs>
        <clipPath id="clip0_241_3443">
          <rect width={size} height={size} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconShopping;
