import { Camera } from "lucide-react";
import React from "react";

const MainPage: React.FC = () => {
  return (
    <>
      <div className="text-main font-light">A</div>
      <div className="bg-main font-normal">A</div>
      <div className="text-marker-food font-medium">A</div>
      <div className="text-marker-food-light font-semibold">A</div>
      <div className="font-bold">A</div>
      <Camera color="red" size={48} />
    </>
  );
};

export default MainPage;
