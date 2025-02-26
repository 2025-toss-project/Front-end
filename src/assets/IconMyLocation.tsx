import React from "react";

const IconMyLocation: React.FC<{ size?: number; style?: string }> = ({
  size = 32,
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style}
    >
      <path
        d="M8.80001 15.9998H6.66669M6.66669 15.9998C6.66669 21.1545 10.8454 25.3332 16 25.3332M6.66669 15.9998C6.66669 10.8452 10.8454 6.6665 16 6.6665M25.3334 15.9998H23.2M25.3334 15.9998C25.3334 21.1545 21.1547 25.3332 16 25.3332M25.3334 15.9998C25.3334 10.8452 21.1547 6.6665 16 6.6665M16 8.8001V6.6665M16 25.3332V23.2001M20 15.9998C20 18.209 18.2092 19.9998 16 19.9998C13.7909 19.9998 12 18.209 12 15.9998C12 13.7907 13.7909 11.9998 16 11.9998C18.2092 11.9998 20 13.7907 20 15.9998Z"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconMyLocation;
