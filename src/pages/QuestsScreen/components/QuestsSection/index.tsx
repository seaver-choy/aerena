import IconAction from "../../../../assets/icon-action.svg";

export const QuestsSection = () => {
  return (
    <div className="mb-[24vw] ml-[4vw] mr-[4vw] mt-[4vw] flex h-full flex-col gap-[4vw] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-row rounded-[3vw] bg-gradient-to-b from-graylight to-graydark pl-[0.5vh] pr-[0.5vh] pt-[0.5vh]">
        <div className="flex h-full w-screen flex-col gap-[1vw] rounded-[2.4vw] bg-graydark px-[4vw] py-[2vw]">
          <div className="flex h-full w-full">
            <p className="font-russoone text-[3.5vw] font-normal text-white">
              Weekly Quest #1
            </p>
          </div>
          <div className="flex h-full w-full">
            <div className="flex h-full w-full items-center gap-[2vw]">
              <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[5vw] font-extrabold text-transparent">
                1 Mythic Pack
              </p>
            </div>
            <div className="flex h-full w-full items-center justify-end">
              <button>
                <img className="h-[6vw]" src={IconAction} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
