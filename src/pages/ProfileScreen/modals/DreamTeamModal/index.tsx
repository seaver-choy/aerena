import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { appearAnimation } from "../../../../helpers/animation";

import DreamTeamBackground from "../../../../assets/background/dream-team.svg";
import LineupBackground from "../../../../assets/background/lineup.svg";
import LineupButton from "../../../../assets/button/lineup.svg";
import CloseIcon from "../../../../assets/icon/close.svg";
import * as htmlToImage from "html-to-image";
import { DreamTeam, TeamColor } from "../../../../helpers/interfaces";
import { AthleteCard } from "../../../../components/AthleteCard";
import { getBaseTeamColor } from "../../../../helpers/athletes";
import { shareDreamTeam } from "../../../../helpers/lambda.helper";
import { useUsers } from "../../../../hooks/useUser";
import { useUtils } from "@telegram-apps/sdk-react";
import FacebookIcon from "../../../../assets/icon/facebook.svg";
import TelegramIcon from "../../../../assets/icon/telegram.svg";
import MessengerIcon from "../../../../assets/icon/messenger.svg";
import { isIOS } from "../../../../helpers/utilities";
interface DreamTeamModalProps {
    dreamTeam: DreamTeam;
    imageUrl: string;
    currentlySample: boolean;
    setCurrentlySample: (currentlySample: boolean) => void;
    onClose: () => void;
    // isExporting: boolean;
    // setIsExporting: (isExporting: boolean) => void;
    // setShareData: (data: ShareData) => void;
}

export const DreamTeamModal = ({
    dreamTeam,
    imageUrl,
    currentlySample,
    setCurrentlySample,
    onClose,
}: DreamTeamModalProps) => {
    const user = useUsers();
    const lineupRef = useRef<HTMLDivElement>(null);
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());
    const [exporting, isExporting] = useState<boolean>(false);
    const utils = useUtils();

    const exportLineup = async () => {
        if (currentlySample) {
            isExporting(true);
            if (!lineupRef.current) {
                return Promise.resolve();
            }

            try {
                const dataUrl = await htmlToImage.toPng(lineupRef.current, {
                    cacheBust: true,
                    pixelRatio: 3,
                });

                const result = await shareDreamTeam(
                    user.id,
                    dataUrl,
                    user.initDataRaw
                );
                user.dispatch({
                    type: "SET_DREAM_TEAM_SHARE_COUNTER",
                    payload: {
                        dreamTeamShareCounter:
                            result.user["dreamTeamShareCounter"],
                    },
                });
                isExporting(false);
                setCurrentlySample(false);
                return Promise.resolve();
            } catch (error) {
                console.error("Error exporting lineup:", error);
                isExporting(false);
                return Promise.reject(error);
            }
        }
        return Promise.resolve();
    };

    const downloadImageInstantView = async () => {
        await exportLineup();
        utils.openLink(imageUrl, { tryInstantView: true });
    };

    const shareOnFB = async () => {
        await exportLineup();
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;
        utils.openLink(shareUrl);
    };

    const shareOnTelegram = async () => {
        await exportLineup();
        utils.shareURL(
            imageUrl,
            "Check out my dream team lineup! Visit https://t.me/aerena_bot"
        );
    };

    const shareOnNavigator = async () => {
        await exportLineup();
        try {
            await navigator.share({
                title: "Dream Team Lineup",
                text: "Check out my dream team lineup! Visit https://t.me/aerena_bot",
                url: imageUrl,
            });
        } catch (err) {
            console.error("Error sharing:", err);
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
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="h-full w-full bg-graydark opacity-95" />
                <div className="absolute flex h-[96vw] w-[80vw] flex-col gap-[6vw]">
                    <div
                        className="relative flex h-[80vw] w-[80vw] justify-center"
                        ref={lineupRef}
                    >
                        <div className="absolute flex h-full w-full items-center justify-center">
                            <div className="mt-[2vw] h-[75vw]">
                                <img
                                    className="h-full"
                                    src={LineupBackground}
                                />
                            </div>
                        </div>
                        <div className="absolute top-[10.5vw]">
                            <p className="font-russoone text-[4vw] text-golddark">
                                {dreamTeam.teamProfile != null &&
                                dreamTeam.teamProfile.key != undefined
                                    ? dreamTeam.teamProfile.key
                                    : "My Dream Team"}
                            </p>
                        </div>
                        <div className="absolute top-[18.5vw] flex h-[47vw] w-[56vw] flex-row flex-wrap items-center justify-center gap-[1vw]">
                            {dreamTeam.lineup.map((athlete, index) => (
                                <motion.div
                                    className="h-[23vw] w-[18vw] overflow-hidden"
                                    {...appearAnimation}
                                    key={index}
                                >
                                    <AthleteCard
                                        color={
                                            dreamTeam.teamProfile != undefined
                                                ? dreamTeam.teamProfile
                                                      .baseTeamColors
                                                : baseColor
                                        }
                                        ign={athlete.displayName}
                                        role={athlete.position[0]}
                                        opacity={{
                                            wave:
                                                dreamTeam.teamProfile !=
                                                undefined
                                                    ? dreamTeam.teamProfile
                                                          .baseTeamColors.wave
                                                    : baseColor.wave,
                                        }}
                                        id={index}
                                    />
                                </motion.div>
                            ))}
                        </div>
                        <div className="absolute bottom-[2.6vw] flex h-[10vw] w-[33vw]">
                            <div className="relative w-full items-center justify-center">
                                <div className="absolute flex h-full w-full items-center justify-center">
                                    <p className="text-center font-russoone text-[1.8vw] text-white">
                                        Aerena Esports Fantasy
                                    </p>
                                </div>
                                <img
                                    className="h-full w-full"
                                    src={LineupButton}
                                />
                            </div>
                        </div>
                        <img
                            className="h-full w-full"
                            src={DreamTeamBackground}
                        />
                    </div>
                    {isIOS() ? (
                        <div className="flex h-[10vw] w-[80vw] items-center justify-center gap-[2vw]">
                            <motion.button
                                className="h-[10vw]"
                                {...appearAnimation}
                                disabled={exporting}
                                onClick={shareOnNavigator}
                            >
                                <img
                                    className={`h-[10vw] ${exporting ? "opacity-50" : "opacity-100"}`}
                                    src={MessengerIcon} /* temporary/filler */
                                />
                            </motion.button>
                            <motion.button
                                className="h-[10vw]"
                                onClick={onClose}
                                {...appearAnimation}
                            >
                                <img className="h-full" src={CloseIcon} />
                            </motion.button>
                        </div>
                    ) : (
                        <div className="flex h-[10vw] w-[80vw] items-center justify-center gap-[4vw]">
                            <motion.button
                                className="h-[10vw]"
                                {...appearAnimation}
                                disabled={exporting}
                                onClick={downloadImageInstantView}
                            >
                                <img
                                    className={`h-[10vw] ${exporting ? "opacity-50" : "opacity-100"}`}
                                    src={MessengerIcon} /* temporary/filler */
                                />
                            </motion.button>
                            <motion.button
                                className="h-[10vw]"
                                {...appearAnimation}
                                disabled={exporting}
                                onClick={shareOnTelegram}
                            >
                                <img
                                    className={`h-[10vw] ${exporting ? "opacity-50" : "opacity-100"}`}
                                    src={TelegramIcon}
                                />
                            </motion.button>
                            <motion.button
                                className="h-[10vw]"
                                {...appearAnimation}
                                disabled={exporting}
                                onClick={shareOnFB}
                            >
                                <img
                                    className={`h-full ${exporting ? "opacity-50" : "opacity-100"}`}
                                    src={FacebookIcon}
                                />
                            </motion.button>
                            <motion.button
                                className="h-[10vw]"
                                onClick={onClose}
                                {...appearAnimation}
                            >
                                <img className="h-full" src={CloseIcon} />
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
