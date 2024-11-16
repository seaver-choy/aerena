import { TonConnectButton } from "@tonconnect/ui-react";
import { useEffect } from "react";

export const TutorialModal = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40">
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="h-full w-full bg-light" />
        <div className="absolute z-50 flex h-[66.5vw] w-[66vw] animate-modal flex-col justify-center">
          <div className="mb-[4vw] flex h-[55vw] items-center justify-center pl-[4vw] pr-[4vw]">
            <TonConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};
