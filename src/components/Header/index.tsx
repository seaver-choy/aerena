import { useTonAddress } from "@tonconnect/ui-react";

export const Header = () => {
  const walletAddress = useTonAddress(true);

  return (
    <div className="z-10 ml-[4vw] mr-[4vw] mt-[4vw] flex flex-row rounded-[2.5vw] bg-gradient-to-r from-graylight to-graydark p-[5vw]">
      <p className="font-montserrat text-[4vw] font-medium text-white">
        { walletAddress }
      </p>
    </div>
  );
};
