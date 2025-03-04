import { motion } from "motion/react";
import {
    appearAnimation,
    slideRightTextAnimation,
} from "../../../../helpers/animation";

import BattlePointsIcon from "../../../../assets/icon/battle-points-gold.svg";
import ActionIcon from "../../../../assets/icon/action.svg";
import ClaimIcon from "../../../../assets/icon/claim.svg";
import ClaimedIcon from "../../../../assets/icon/claimed.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initUtils } from "@telegram-apps/sdk-react";
import { useUsers } from "../../../../hooks/useUser";
import { claimQuest, updateQuestField } from "../../../../helpers/lambda.helper";

interface Quest {
    _id: string;
    questId: number;
    taskName: string;
    description: string;
    value: number | boolean | null;
    isWeekly: boolean;
    isRepeating: boolean;
    reward: number;
    isClaimable: boolean;
    isClaimed: boolean;
}

interface TaskSectionProps {
    questTab: string;
    quests: Quest[];
}

export const TasksSection = ({ questTab, quests }: TaskSectionProps) => {
    const [allQuests, setAllQuests] = useState<Quest[]>(null);
    const user = useUsers();
    const navigate = useNavigate();
    const utils = initUtils();

    const prepareQuestCards = (quests) => {
        for (const userQuest of user.quests) {
            if (!userQuest.isClaimed && quests !== null) {
                const currentQuestIndex = quests.findIndex(
                    (item) => item.questId === userQuest.questId
                );
                const value = quests[currentQuestIndex].value;
                if(!quests[currentQuestIndex].isRepeating)
                    switch(value){
                        case null:
                            if(user[quests[currentQuestIndex].taskName] != null) {
                                quests[currentQuestIndex].isClaimable = true;
                            }
                            break;
                        case true:
                            if(user[quests[currentQuestIndex].taskName]) {
                                quests[currentQuestIndex].isClaimable = true;
                            }
                            break;
                        default:
                            if(user[quests[currentQuestIndex].taskName] >= quests[currentQuestIndex].value) {
                                quests[currentQuestIndex].isClaimable = true;
                            }
                            break;
                    }
            }

            if (quests != null) {
                const currentQuestIndex = quests.findIndex(
                    (item) => item.questId === userQuest.questId
                );
                quests[currentQuestIndex].isClaimed = userQuest.isClaimed;
            }
        }
        setAllQuests([...quests]);
    }

    const handleQuestClick = async (questId: number) => {
        const data = await claimQuest(user.id, questId, user.initDataRaw);
        user.dispatch({
            type: "SET_QUESTS",
            payload: { quests: data["quests"] },
        });
        user.dispatch({
            type: "SET_POINTS",
            payload: { points: data["points"] },
        });
        const currentQuestIndex = quests.findIndex(
            (item) => item.questId === questId
        );
        quests[currentQuestIndex].isClaimed = true;
        prepareQuestCards(quests);
    }

    const handleRedirect = async (quest: Quest) => {
        try {
            let data;
            switch (quest.taskName) {
                case "joinedTgCommunity":
                    data = await updateQuestField(user.id, "joinedTgCommunity", user.initDataRaw);
                    user.dispatch({
                        type: "SET_JOINED_TG_COMMUNITY",
                        payload: { joinedTgCommunity: data["joinedTgCommunity"] },
                    });
                    utils.openTelegramLink("https://t.me/aerenagg");
                    break;
                case "joinedTgChannel":
                    data = await updateQuestField(user.id, "joinedTgChannel", user.initDataRaw);
                    user.dispatch({
                        type: "SET_JOINED_TG_CHANNEL",
                        payload: { joinedTgChannel: data["joinedTgChannel"] },
                    });
                    utils.openTelegramLink("https://t.me/aerenachannel");
                    break;
                case "likedAerenaPage":
                    data = await updateQuestField(user.id, "likedAerenaPage", user.initDataRaw);
                    user.dispatch({
                        type: "SET_LIKED_AERENA_PAGE",
                        payload: { likedAerenaPage: data["likedAerenaPage"] },
                    });
                    window.open("https://www.facebook.com/aerenagg");
                    break;
                 case "joinedBeGods":
                    data = await updateQuestField(user.id, "joinedBeGods", user.initDataRaw);
                    user.dispatch({
                        type: "SET_JOINED_BE_GODS",
                        payload: { joinedBeGods: data["joinedBeGods"] },
                    });
                    utils.openTelegramLink("https://t.me/BeGods_bot");
                    break;
                case "friends":
                case "referredBy":
                    navigate("/friends");
                    break;
                default:
                    navigate("/");
                    break;
            }
        } catch (error) {
            console.error("Error handling redirect:", error);
        }
    };

    useEffect(() => {
        if(quests != null) {
            prepareQuestCards(quests);
        }
    }, [quests, user]);

    return allQuests != null && (
        <div className="mx-[4vw] mt-[4vw] flex flex-col gap-[2vw]">
            {
                allQuests?.map((quest) =>
                (questTab == "Weekly" && quest.isWeekly) ||
                (questTab == "Main" && !quest.isWeekly) ?
                (
                    <div className="flex w-full rounded-[3vw] bg-gradient-to-b from-gold to-graydark px-[0.5vh] pt-[0.5vh]">
                        <div className="flex h-full w-screen flex-row rounded-[2.4vw] bg-graydark px-[4vw] py-[3vw]">
                            <div className="flex h-full w-[80%] flex-col">
                                <motion.div
                                    className="flex"
                                    {...slideRightTextAnimation}
                                >
                                    <p className="font-montserrat text-[4vw] font-extrabold text-white">
                                        {quest.description}
                                    </p>
                                </motion.div>
                                <motion.div
                                    className="flex gap-[2vw]"
                                    {...slideRightTextAnimation}
                                >
                                    <img
                                        className="mt-[1.2vw] h-[5vw]"
                                        src={BattlePointsIcon}
                                    />
                                    <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[5vw] font-extrabold text-transparent">
                                        {quest.reward.toLocaleString()}
                                    </p>
                                </motion.div>
                            </div>
                            {
                                quest.isClaimable || quest.isClaimed ?
                                (
                                    <div className="flex w-[20%] items-center justify-end gap-[2vw]">
                                        <motion.button
                                            className="h-[8vw]" {...appearAnimation}
                                            onClick={() => {
                                                if (!quest.isClaimed)
                                                    handleQuestClick(quest.questId);
                                            }}
                                            disabled={quest.isClaimed}
                                        >
                                            <img className="h-full" src={quest.isClaimed ? ClaimedIcon : ClaimIcon} />
                                        </motion.button>
                                    </div>
                                )
                                :
                                (
                                    <div className="flex w-[20%] items-center justify-end gap-[2vw]">
                                        <motion.button
                                            className="h-[8vw]" {...appearAnimation}
                                            onClick={() =>handleRedirect(quest)}
                                        >
                                            <img className="h-full" src={ActionIcon} />
                                        </motion.button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
                :
                ("")
            )}
        </div>
    );
};
