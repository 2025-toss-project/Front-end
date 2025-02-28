import DaumPostcodeEmbed from "react-daum-postcode";

const SearchLocation = () => {
  const onComplete = (data: any) => {
    console.log(data.jibunAddress);
  };
  return (
    <DaumPostcodeEmbed style={{ height: "100%" }} onComplete={onComplete} />
  );
};

export default SearchLocation;
