import React from "react";

const IconMapMarker: React.FC<{ color: string }> = ({ color }) => {
  return (
    <svg
      width="34"
      height="42"
      viewBox="0 0 34 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative grid place-items-center"
    >
      <path
        d="M34 16.8002C34 27.2856 22.2296 38.2058 18.2771 41.5784C17.9089 41.852 17.4607 42 17 42C16.5393 42 16.0911 41.852 15.7229 41.5784C11.7704 38.2058 0 27.2856 0 16.8002C0 12.3445 1.79107 8.07132 4.97919 4.92067C8.1673 1.77002 12.4913 0 17 0C21.5087 0 25.8327 1.77002 29.0208 4.92067C32.2089 8.07132 34 12.3445 34 16.8002Z"
        fill={color}
        className="absolute"
      />
    </svg>
  );
};

export default IconMapMarker;
