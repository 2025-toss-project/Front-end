import React from "react";

const SelectAgeGroup: React.FC<{
  selectedAge: string;
  setSelectedAge: React.Dispatch<React.SetStateAction<string>>;
  style?: string;
}> = ({ selectedAge, setSelectedAge, style = "" }) => {
  const ageGroups = ["10대", "20대", "30대", "40대", "50대~"];
  return (
    <div className={`flex flex-col gap-2 ${style}`}>
      <div className="text-sm">연령대</div>
      <div className="z-10 flex min-w-[calc(100vw-24px)] gap-3 overflow-x-scroll pr-6">
        {ageGroups.map((age) => (
          <div
            key={age}
            onClick={() => {
              setSelectedAge(age);
            }}
            className={`${selectedAge === age ? "border-main text-main" : "border-second text-second"} shrink-0 rounded-full border px-5 py-2`}
          >
            {age}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectAgeGroup;
