import { useState } from "react";

interface TabsProps {
  options: string[];
  onToggle?: (selectedOption: string) => void;
}
export const Tabs = ({ options, onToggle }: TabsProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleToggle = (option: any) => {
    setSelectedOption(option);
    if (onToggle) onToggle(option);
  };

  return (
    <div className="animate-tabs bg-gray ml-[4vw] mr-[4vw] mt-[4vw] flex justify-center gap-[2vw] rounded-[2.5vw] p-[1vw]">
      {options.map((option) => (
        <div
          key={option}
          className={`flex h-full w-full cursor-pointer items-center justify-center rounded-[2vw] p-[2vw] text-white ${
            selectedOption === option ? "bg-graydark" : "opacity-20"
          }`}
          onClick={() => handleToggle(option)}
        >
          <p className="mt-[0.4vw] font-russoone text-[3.5vw] font-normal">
            {option}
          </p>
        </div>
      ))}
    </div>
  );
};
