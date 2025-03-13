import React, { useEffect, useState } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useUsers } from "../../hooks/useUser";
import { motion } from "motion/react";
import { appearAnimation, appearModalAnimation } from "../../helpers/animation";
import { createUser, checkUsernameExists } from "../../helpers/lambda.helper";

import UsernameBackground from "../../assets/modal/username.svg";
import AerenaTextLogo from "../../assets/logo/aerena-text.svg";
import RightIcon from "../../assets/icon/right-gold.svg";

const UsernameModal: React.FC = () => {
    const user = useUsers();
    const [username, setUsername] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, isLoading] = useState<boolean>(false);

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^a-zA-Z0-9]/g, "");
        setUsername(filteredValue);
    };
    const lp = useLaunchParams();

    const handleSubmit = async () => {
        if (!loading) {
            setErrorMessage("");
            isLoading(true);
            if (!username || username.length === 0) {
                isLoading(false);
                setErrorMessage("Please choose a username.");
                return;
            } else if (username.length < 3 || username.length > 12) {
                isLoading(false);
                setErrorMessage(
                    "Choose a username 3-12 characters long. Usernames can have letters (a-z) & numbers (0-9)."
                );
                return;
            }

            const checkData = await checkUsernameExists(
                username,
                user.initDataRaw
            );
            if (checkData["message"] == "DUPLICATE") {
                isLoading(false);
                setErrorMessage("Username is already taken.");
                return; //have to change this
            } else if (checkData["message"] == "UNIQUE") {
                let data = null;

                console.log(username);
                if (lp.startParam) {
                    console.log("Found referral link");
                    data = await createUser(
                        lp.initData.user.id,
                        username,
                        true,
                        lp.startParam,
                        user.initDataRaw
                    );
                    // await updateReferrals(lp.startParam, {
                    //     userID: lp.initData.user.id,
                    //     username: username,
                    // });
                } else {
                    data = await createUser(
                        lp.initData.user.id,
                        username,
                        false,
                        "",
                        user.initDataRaw
                    );
                }
                user.dispatch({
                    type: "SET_USERNAME",
                    payload: { username: data["username"] },
                });
                user.dispatch({
                    type: "SET_ID",
                    payload: { id: data["userID"] },
                });
                user.dispatch({
                    type: "SET_POINTS",
                    payload: { points: data["points"] },
                });
                user.dispatch({
                    type: "SET_TOKENS",
                    payload: { tokens: data["tokens"] },
                });
                user.dispatch({
                    type: "SET_HAS_BOUGHT_STARTER",
                    payload: { hasBoughtStarter: data["hasBoughtStarter"] },
                });
                user.dispatch({
                    type: "SET_NUM_BOOSTER_BOUGHT",
                    payload: { numBoosterBought: data["numBoosterBought"] },
                });
                user.dispatch({
                    type: "SET_TOTAL_BOOSTER_BOUGHT",
                    payload: { totalBoosterBought: data["totalBoosterBought"] },
                });
                user.dispatch({
                    type: "SET_FRIENDS",
                    payload: { friends: data["friends"] },
                });
                user.dispatch({
                    type: "SET_REFERRAL_COUNT",
                    payload: { referralCount: data["referralCount"] },
                });

                user.dispatch({
                    type: "SET_JOINED_TOURNAMENTS",
                    payload: {
                        joinedTournaments: data["joinedTournaments"],
                    },
                });
                user.dispatch({
                    type: "SET_HAS_WON_TOURNAMENT",
                    payload: { hasWonTournament: data["hasWonTournament"] },
                });
                user.dispatch({
                    type: "SET_JOINED_TG_COMMUNITY",
                    payload: { joinedTgCommunity: data["joinedTgCommunity"] },
                });
                user.dispatch({
                    type: "SET_JOINED_TG_CHANNEL",
                    payload: { joinedTgChannel: data["joinedTgChannel"] },
                });
                user.dispatch({
                    type: "SET_LIKED_AERENA_PAGE",
                    payload: { likedAerenaPage: data["likedAerenaPage"] },
                });
                user.dispatch({
                    type: "SET_JOINED_BE_GODS",
                    payload: { joinedBeGods: data["joinedBeGods"] },
                });
                user.dispatch({
                    type: "SET_JOINED_THE_BOBO_BOT",
                    payload: { joinedTheBoboBot: data["joinedTheBoboBot"] },
                });
                user.dispatch({
                    type: "SET_QUESTS",
                    payload: { quests: data["quests"] },
                });
                user.dispatch({
                    type: "SET_SEASONAL_LOGINS",
                    payload: { seasonalLogins: data["seasonalLogins"] },
                });
                user.dispatch({
                    type: "SET_PREMIUM_MEMBER",
                    payload: { premiumMember: data["premiumMember"] },
                });
                user.dispatch({
                    type: "SET_INVENTORY",
                    payload: { inventory: data["inventory"] },
                });
                user.dispatch({
                    type: "SET_REFERRAL_PURCHASES",
                    payload: { referralPurchases: 0 },
                });
                user.dispatch({
                    type: "SET_DREAM_TEAM",
                    payload: { dreamTeam: data["dreamTeam"] },
                });
                user.dispatch({
                    type: "SET_REFERRAL_CODE",
                    payload: {
                        referralCode: data["referralCode"],
                    },
                });
                user.dispatch({
                    type: "SET_REFERRED_BY",
                    payload: {
                        referredBy: data["referredBy"],
                    },
                });
                user.dispatch({
                    type: "SET_SKINS",
                    payload: {
                        referredBy: data["skins"],
                    },
                });
                user.dispatch({
                    type: "SET_COUNTRY",
                    payload: {
                        country: data["country"],
                    },
                });
                user.dispatch({
                    type: "SET_NUM_BOOSTER_BOUGHT",
                    payload: { numBoosterBought: data["numBoosterBought"] },
                });

                user.dispatch({
                    type: "SET_REFERRAL_CHECK",
                    payload: { referralCheck: true },
                });
                isLoading(false);
            }
        }
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-40">
            <div className="relative flex h-full w-full items-center justify-center bg-graydark">
                <div className="absolute z-40 h-[59.8vw] w-[92vw]">
                    <div className="relative h-full w-full">
                        <motion.div {...appearModalAnimation}>
                            <img
                                className="h-full w-full"
                                src={UsernameBackground}
                            />
                        </motion.div>
                        <motion.div
                            className="absolute top-[10vw] flex h-[9vw] w-full items-center justify-center"
                            {...appearAnimation}
                        >
                            <img className="h-full" src={AerenaTextLogo} />
                        </motion.div>
                        <div className="absolute left-[5.6vw] top-[25.7vw] flex h-[13.1vw] w-[81vw]">
                            <div className="flex h-full w-[85%] flex-col justify-center px-[4vw]">
                                <p className="mt-[1vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2.5vw] font-normal text-transparent">
                                    USERNAME
                                </p>
                                <input
                                    className="-mt-[1vw] flex w-full bg-transparent font-russoone text-[4.5vw] font-normal text-white focus:outline-none"
                                    type="text"
                                    value={username}
                                    placeholder="Enter your username"
                                    onChange={handleUsernameChange}
                                    maxLength={12}
                                    disabled={loading}
                                ></input>
                            </div>
                            <motion.button
                                className="flex h-full w-[15%] items-center justify-center"
                                onClick={() => handleSubmit()}
                                disabled={loading}
                                {...appearAnimation}
                            >
                                <img className="h-[5vw]" src={RightIcon} />
                            </motion.button>
                        </div>
                        <div className="absolute left-[5.6vw] top-[40.8vw] flex h-[8vw] w-[81vw] justify-center">
                            {errorMessage && (
                                <p className="text-center font-russoone text-[3vw] font-extralight text-red">
                                    {errorMessage}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsernameModal;
