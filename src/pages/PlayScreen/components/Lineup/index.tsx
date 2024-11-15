import EmptyRoam from "../../../../assets/empty-roam.svg";
import EmptyMid from "../../../../assets/empty-mid.svg";
import EmptyJungle from "../../../../assets/empty-jungle.svg";
import EmptyGold from "../../../../assets/empty-gold.svg";
import EmptyEXP from "../../../../assets/empty-exp.svg";

export const Lineup = () => {
  return (
    <div className="absolute top-[25vw] flex flex-row flex-wrap items-center justify-center gap-[4vw]">
      <button className="relative animate-appear flex h-[37vw] w-[28vw]">
        <img className="h-[100%]" src={EmptyRoam} />
      </button>
      <button className="relative animate-appear flex h-[37vw] w-[28vw]">
        <img className="h-[100%]" src={EmptyMid} />
      </button>
      <button className="relative animate-appear flex h-[37vw] w-[28vw]">
        <img className="h-[100%]" src={EmptyJungle} />
      </button>
      <button className="relative animate-appear flex h-[37vw] w-[28vw]">
        <img className="h-[100%]" src={EmptyGold} />
      </button>
      <button className="relative animate-appear flex h-[37vw] w-[28vw]">
        <img className="h-[100%]" src={EmptyEXP} />
      </button>
    </div>
  );
};
