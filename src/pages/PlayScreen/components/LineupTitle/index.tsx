import ButtonFunction from "../../../../assets/button-function.svg";
import LineBasic from "../../../../assets/line-basic.svg";

export const LineupTitle = () => {
  return (
    <div className="absolute top-0 flex h-[20vw] w-full justify-center pl-[4vw] pr-[4vw] pt-[6vw]">
      <div className="flex h-full w-[50%] items-center pl-[4vw]">
        <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
          Fantasy Lineup
        </p>
      </div>
      <div className="flex h-full w-[50%] items-center justify-end gap-[2vw]">
        <button className="pointer-events-none relative flex h-[7vw] items-center justify-center">
          <div className="absolute flex">
            <p className="mt-[0.2vw] font-russoone text-[2vw] font-normal tracking-wide text-white">
              Edit
            </p>
          </div>
          <img className="h-[100%]" src={ButtonFunction}></img>
        </button>
      </div>
      <img className="absolute bottom-0 w-full" src={LineBasic}></img>
    </div>
  );
};
