import { Camera } from "lucide-react";
import React from "react";

const MainPage: React.FC = () => {
  return (
    <>
      <div className="font-light text-main">A</div>
      <div className="font-normal bg-main">A</div>
      <div className="font-medium text-marker-food">A</div>
      <div className="font-semibold text-marker-food-light">A</div>
      <div className="font-bold">A</div>
      <Camera color="red" size={48} />
    </>
  );
};

export default MainPage;


