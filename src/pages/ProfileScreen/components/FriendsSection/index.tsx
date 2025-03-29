import { useEffect, useState } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { motion } from "motion/react";
import {
    appearAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";
import { Friend } from "../../../../helpers/interfaces";

import ReferralIcon from "../../../../assets/icon/referral.svg";

export const FriendsSection = () => {
    const user = useUsers();
    const [friends, setFriends] = useState<Friend[]>(user.friends);

    useEffect(() => {
        setFriends(user.friends);
    }, [user.friends]);

    return (
        <div className="mx-[4vw] mt-[4vw] flex flex-col gap-[2vw]">
            {friends.map((friend, index) => (
                <div
                    key={index}
                    className="flex w-full rounded-[3vw] bg-gradient-to-b from-gold to-graydark px-[0.5vh] pt-[0.5vh]"
                >
                    <div className="flex h-full w-screen flex-row rounded-[2.4vw] bg-graydark px-[4vw] py-[4vw]">
                        <motion.div
                            className="flex h-full w-[70%]"
                            {...slideRightTextAnimation}
                        >
                            <p className="font-montserrat text-[4vw] font-extrabold text-white">
                                {friend.username}
                            </p>
                        </motion.div>
                        <div className="flex h-full w-[30%] items-center justify-end gap-[2vw]">
                            {friend.isReferred && (
                                <motion.button
                                    className="h-[5vw]"
                                    {...appearAnimation}
                                >
                                    <img
                                        className="h-full"
                                        src={ReferralIcon}
                                    />
                                </motion.button>
                            )}
                            {/* <motion.button className="h-[5vw]" {...appearAnimation} disabled>
                                    <img className="h-full" src={GiftIcon} />
                                </motion.button> */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
