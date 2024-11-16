import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import IconLogo from "../../assets/icon-logo.svg";

export const Header = () => {
  return (
    <div className="z-10 ml-[4vw] mr-[4vw] mt-[4vw] flex justify-center flex-row rounded-[2.5vw] bg-gradient-to-r from-graylight to-graydark p-[5vw]">
      <div className="w-[20%] flex items-center h-full">
        <img className="h-[10vw]" src={IconLogo} />
      </div>
      <div className="w-[80%] flex justify-end h-full">
        <TonConnectButton />
      </div>
    </div>
  );
};
