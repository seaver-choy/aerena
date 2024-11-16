import IconAddFriend from "../../../../assets/icon-addfriend.svg";
import IconNotifications from "../../../../assets/icon-notifications.svg";
import IconCopy from "../../../../assets/icon-copy.svg";

interface FriendsBannerProps {
  onClick: () => void;
}

export const FriendsBanner = ({ onClick }: FriendsBannerProps) => {
  return (
    <div className="z-10 ml-[4vw] mr-[4vw] mt-[4vw] flex animate-title flex-row rounded-[3vw] bg-gradient-to-b from-gold to-graydark pl-[0.5vh] pr-[0.5vh] pt-[0.5vh]">
      <div className="flex h-full w-screen rounded-[2.4vw] bg-graydark p-[4vw]">
        <div className="flex h-full w-[50%] items-center justify-start gap-[1.5vw]">
          <div className="flex flex-col">
            <p className="font-montserrat text-[4.5vw] font-extrabold text-white">
              10 Friends
            </p>
            <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[3.5vw] font-extrabold text-transparent">
              6 Referrals
            </p>
          </div>
          <div className="flex"></div>
        </div>
        <div className="flex h-full w-[50%] items-center justify-end gap-[3vw]">
          <button>
            <img className="h-[6vw] opacity-30" src={IconAddFriend}></img>
          </button>
          <button>
            <img className="h-[6vw] opacity-30" src={IconNotifications}></img>
          </button>
          <button onClick={onClick}>
            <img className="h-[6vw]" src={IconCopy}></img>
          </button>
        </div>
      </div>
    </div>
  );
};
