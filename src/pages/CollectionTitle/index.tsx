import { Link } from "react-router-dom";

import ButtonFunction from "../../assets/button-function.svg";
import LineBasic from "../../assets/line-basic.svg";

export const CollectionTitle = () => {
  return (
    <div className="absolute flex h-[25vw] w-full pl-[4vw] pr-[4vw] pt-[11vw]">
      <div className="flex h-full w-[50%] items-center pl-[4vw]">
        <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
          Personal Collection
        </p>
      </div>
      <div className="flex h-full w-[50%] items-center justify-end gap-[2vw]">
        <Link
          to={"/exchange"}
          className="relative flex h-[7vw] items-center justify-center"
        >
          <div className="absolute flex">
            <p className="mt-[0.4vw] font-russoone text-[2vw] font-normal tracking-wide text-white">
              Purchase
            </p>
          </div>
          <img className="h-[100%]" src={ButtonFunction}></img>
        </Link>
      </div>
      <img className="absolute bottom-0 left-0 w-full" src={LineBasic}></img>
    </div>
  );
};
