import IconDiamond from "../../assets/icon-diamond.svg";

export const Title = () => {
  return (
    <div className="mt-[6vw] flex animate-title items-center justify-center gap-[2vw]">
      <img className="h-[1.5vh]" src={IconDiamond}></img>
      <p className="-mb-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[6vw] font-normal text-transparent">
        Join Tournament
      </p>
      <img className="h-[1.5vh]" src={IconDiamond}></img>
    </div>
  );
};
