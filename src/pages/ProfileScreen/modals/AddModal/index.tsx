import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
    appearModalAnimation,
    appearTextAnimation,
} from "../../../../helpers/animation";

import SmallModal from "../../../../assets/modal/small.svg";
import GoldButton from "../../../../assets/button/gold.svg";

interface AddModalProps {
    handleSubmit: (code: string) => void;
    onClose: () => void;
}

export const AddModal = ({ handleSubmit, onClose }: AddModalProps) => {
    const [searchReferral, setSearchReferral] = useState<string>("");

    const handleCheckReferralCode = async () => {
        handleSubmit(searchReferral);
        onClose();
    };

    const handleCodeChange = (e) => {
        setSearchReferral(e.target.value);
    };

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
                <motion.div
                    className="absolute z-40 h-[82.5vw] w-[80vw]"
                    {...appearModalAnimation}
                >
                    <img className="h-full w-full" src={SmallModal} />
                </motion.div>
                <div className="absolute z-50 flex h-[66.5vw] w-[66vw] flex-col justify-center">
                    <div className="mb-[4vw] flex h-[55vw] flex-col items-center justify-center px-[4vw]">
                        <motion.div
                            className="mt-[4vw] flex h-[5.5vw] flex-row gap-[2vw]"
                            {...appearTextAnimation}
                        >
                            <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
                                Referral Code
                            </p>
                        </motion.div>
                        <motion.div
                            className="mt-[4vw] flex h-[41.5vw] w-full flex-col items-center justify-center"
                            {...appearTextAnimation}
                        >
                            <div className="h-[13vw] w-full rounded-[3vw] bg-gradient-to-b from-gold to-graydark px-[0.5vh] pt-[0.5vh]">
                                <div className="flex h-full w-full rounded-[2.4vw] bg-graydark px-[4vw] py-[4vw]">
                                    <input
                                        className="flex w-full bg-transparent font-russoone text-[4.5vw] font-normal text-white focus:outline-none"
                                        type="text"
                                        placeholder="Enter Referral Code"
                                        maxLength={12}
                                        onChange={handleCodeChange}
                                    ></input>
                                </div>
                            </div>
                            <p className="mx-[2vw] mt-[2vw] text-center font-montserrat text-[3.5vw] text-graydark">
                                Enter the referral code from your friend.
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex h-[7.5vw] justify-center gap-[4vw]">
                        <div className="flex h-full w-full">
                            <motion.button
                                className="relative flex h-full w-full justify-center"
                                onClick={handleCheckReferralCode}
                                {...appearTextAnimation}
                            >
                                <img className="h-full" src={GoldButton} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="-mt-[0.4vw] font-russoone text-[3.2vw] font-normal text-white">
                                        Enter
                                    </p>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
