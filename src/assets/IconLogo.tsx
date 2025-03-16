import React from "react";

const IconLogo: React.FC<{ width: number }> = ({ width }) => {
  return (
    <svg
      width={width}
      height={width * 1.24}
      viewBox="0 0 135 168"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.7808 168C26.6562 168 20.8806 162.343 20.8806 155.365V111.664H12.9002C5.7756 111.664 0 106.007 0 99.0283C0 92.0501 5.7756 86.3931 12.9002 86.3931H20.8806V56.8323C20.8806 25.9511 46.6733 -0.16895 78.2016 0.000822992C109.381 0.168729 134.713 24.9811 134.885 55.5199C135.058 86.4006 108.39 111.664 76.8616 111.664H46.681V155.365C46.681 162.343 40.9054 168 33.7808 168ZM46.681 86.3931H77.8831C95.0885 86.3931 109.085 72.6837 109.085 55.8317C109.085 38.9798 95.0885 25.2704 77.8831 25.2704C60.6778 25.2704 46.681 38.9798 46.681 55.8317V86.3931Z"
        fill="url(#paint0_linear_885_1881)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_885_1881"
          x1="0"
          y1="84"
          x2="134.886"
          y2="84"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BC134D" />
          <stop offset="1" stopColor="#2558A7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IconLogo;
