import React, { useState } from "react";
import { useUsers } from "../../hooks/useUser";
import { createUser, checkUsernameExists } from "../../helpers/lambda.helper";
import { useLaunchParams } from "@telegram-apps/sdk-react";

import UsernameBackground from "../../assets/background/username.svg";
import RightIcon from "../../assets/icon/right-gold.svg";

const UsernameModal: React.FC = () => {
    const user = useUsers();
    const [username, setUsername] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^a-zA-Z0-9]/g, "");
        setUsername(filteredValue);
    };
    const lp = useLaunchParams();

    const handleSubmit = async () => {
        if (!isLoading) {
            setErrorMessage("");
            setIsLoading(true);
            if (!username || username.length === 0) {
                setIsLoading(false);
                setErrorMessage("Please choose a username.");
                return;
            } else if (username.length < 3 || username.length > 12) {
                setIsLoading(false);
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
                setIsLoading(false);
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
                    type: "SET_LEVEL",
                    payload: { level: data["level"] },
                });
                user.dispatch({
                    type: "SET_POINT_MULTIPLIER",
                    payload: { pointMultiplier: data["pointMultiplier"] },
                });
                user.dispatch({
                    type: "SET_MAX_MANA",
                    payload: { maxMana: data["maxMana"] },
                });
                user.dispatch({
                    type: "SET_CURRENT_MANA",
                    payload: { currentMana: data["currentMana"] },
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
                    type: "SET_DAILY_REFILL",
                    payload: { dailyRefill: data["dailyRefill"] },
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
                // user.dispatch({
                //     type: "SET_TON_WALLET_CONNECTED",
                //     payload: { tonWalletConnected: data["tonWalletConnected"] },
                // });
                user.dispatch({
                    type: "SET_JOINED_TG_CHANNEL",
                    payload: { joinedTgChannel: data["joinedTgChannel"] },
                });
                user.dispatch({
                    type: "SET_PAID_BOOSTER_CLAIM_COUNTER",
                    payload: {
                        paidBoosterClaimCounter:
                            data["paidBoosterClaimCounter"],
                    },
                });
                user.dispatch({
                    type: "SET_PAID_MANA_CLAIM",
                    payload: { paidManaClaim: data["paidManaClaim"] },
                });
                user.dispatch({
                    type: "SET_DREAM_TEAM_INFO",
                    payload: { dreamTeamInfo: data["dreamTeamInfo"] },
                });
                user.dispatch({
                    type: "SET_QUESTS",
                    payload: { quests: data["quests"] },
                });
                user.dispatch({
                    type: "SET_TASK_STATUS",
                    payload: { taskStatus: data["taskStatus"] },
                });
                user.dispatch({
                    type: "SET_SEASONAL_LOGINS",
                    payload: { seasonalLogins: data["seasonalLogins"] },
                });
                user.dispatch({
                    type: "SET_BATTLEPASS",
                    payload: { battlepass: data["battlepass"] },
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
                    type: "SET_REFERRAL_CHECK",
                    payload: { referralCheck: true },
                });
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-40">
            <div className="relative flex h-full w-full items-center justify-center bg-graydark">
                <div className="z-40 flex flex-col gap-[2vw]">
                    <div className="flex justify-center">
                        <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[3.5vw] font-normal text-transparent">
                            Please enter your username.
                        </p>
                    </div>
                    <div className="relative flex h-[20vw] w-[76vw] items-center justify-center">
                        <img src={UsernameBackground} />
                        <div className="absolute mt-[2vw] flex h-[16.5vw] w-[67vw] items-center">
                            <input
                                className="mb-[4vw] ml-[6vw] mr-[4vw] mt-[4vw] flex h-[8.5vw] w-[40vw] bg-transparent font-russoone text-[5vw] font-normal text-white"
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                maxLength={12}
                            ></input>
                            <button className="flex h-full w-[17vw] items-center justify-center">
                                <img
                                    className="h-[6vw] w-[6vw]"
                                    src={RightIcon}
                                    onClick={() => handleSubmit()}
                                />
                            </button>
                        </div>
                    </div>
                    <div className="mt-[2vw] flex h-[10vw] w-[76vw] items-center justify-center">
                        {isLoading && (
                            <p className="text-center font-russoone text-[2.5vw] font-extralight text-white">
                                Loading
                            </p>
                        )}
                        {errorMessage && (
                            <p className="text-center font-russoone text-[2.5vw] font-extralight text-red">
                                {errorMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsernameModal;
