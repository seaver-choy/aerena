import { motion } from "motion/react";
import {
    appearAnimation,
    appearModalAnimation,
} from "../../../helpers/animation";

import UsernameModal from "../../../assets/modal/username.svg";
import AerenaTextLogo from "../../../assets/logo/aerena-text.svg";
import RightIcon from "../../../assets/icon/right-gold.svg";

export const Modal = () => {
    return (
        <div className="fixed inset-0 z-40">
            <div className="relative flex h-full w-full items-center justify-center bg-light">
                <div className="absolute z-40 h-[59.8vw] w-[92vw]">
                    <div className="relative h-full w-full">
                        <motion.div {...appearModalAnimation}>
                            <img
                                className="h-full w-full"
                                src={UsernameModal}
                            />
                        </motion.div>
                        <motion.div
                            className="absolute top-[10vw] h-[9vw]"
                            {...appearAnimation}
                        >
                            <img
                                className="h-full w-full"
                                src={AerenaTextLogo}
                            />
                        </motion.div>
                        <div className="absolute left-[5.6vw] top-[25.7vw] flex h-[13.1vw] w-[81vw]">
                            <div className="flex h-full w-[85%] flex-col justify-center px-[4vw]">
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] font-normal text-transparent">
                                    USERNAME
                                </p>
                                <input
                                    className="-mt-[1vw] flex w-full bg-transparent font-russoone text-[4.5vw] font-normal text-white focus:outline-none"
                                    type="text"
                                    placeholder="Enter your username"
                                    maxLength={12}
                                ></input>
                            </div>
                            <motion.button
                                className="flex h-full w-[15%] items-center justify-center"
                                {...appearAnimation}
                            >
                                <img className="h-[5vw]" src={RightIcon} />
                            </motion.button>
                        </div>
                        <div className="absolute left-[5.6vw] top-[40.8vw] flex h-[8vw] w-[81vw] justify-center">
                            <p className="text-center font-russoone text-[3vw] font-extralight text-red">
                                Username already taken.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
