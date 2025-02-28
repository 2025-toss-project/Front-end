import { LucideX } from "lucide-react";
import DaumPostcodeEmbed from "react-daum-postcode";
import Header from "../components/common/Header";

const SearchLocation = () => {
  const onComplete = (data: any) => {
    console.log(data.jibunAddress);
  };
  return (
    <div className="flex h-full w-full flex-col">
      <Header title="주소검색" />
      <DaumPostcodeEmbed style={{ height: "100%" }} onComplete={onComplete} />
    </div>
  );
};

export default SearchLocation;
