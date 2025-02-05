import { useEffect } from "react";

import SmallModal from "../../../../assets/modal/small.svg";
import PlayibleLogo from "../../../../assets/logo/playible.svg";

export const LoadingModal = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-40">
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="h-full w-full bg-graydark opacity-95" />
                <div className="absolute z-40 h-[82.5vw] w-[80vw]">
                    <img className="h-full w-full" src={SmallModal} />
                </div>
                <div className="absolute z-50 flex h-[66.5vw] w-[66vw] flex-col items-center justify-center gap-[2vw]">
                    <div className="relative flex items-center justify-center">
                        <div className="h-[20vw] w-[20vw] animate-spin rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-golddark via-gold to-light p-[1.5vw]">
                            <div className="flex h-full w-full rounded-full bg-light"></div>
                        </div>
                        <img
                            className="absolute mt-[4vw] h-[10vw] w-[10vw] animate-bounce"
                            src={PlayibleLogo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
