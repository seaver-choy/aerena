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
import {
    FacebookIcon,
    // FacebookShareButton,
    TelegramIcon,
    // TelegramShareButton,
} from "react-share";
import { sampleURL, shareDreamTeam } from "../../../../helpers/lambda.helper";
import { useUsers } from "../../../../hooks/useUser";
import { useUtils } from "@telegram-apps/sdk-react";
interface DreamTeamModalProps {
    dreamTeam: DreamTeam;
    onClose: () => void;
    // isExporting: boolean;
    // setIsExporting: (isExporting: boolean) => void;
    // setShareData: (data: ShareData) => void;
}

export const DreamTeamModal = ({ dreamTeam, onClose }: DreamTeamModalProps) => {
    const user = useUsers();
    const lineupRef = useRef<HTMLDivElement>(null);
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());
    const [currentlySample, setCurrentlySample] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>(null);
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
                setImageUrl(result.imageUrl);
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

    const downloadImage = async () => {
        await exportLineup();
        utils.openLink(imageUrl);
    };

    const downloadImageBrowser = async () => {
        await exportLineup();
        utils.openLink(imageUrl, { tryBrowser: true });
    };

    const downloadImageInstantView = async () => {
        await exportLineup();
        utils.openLink(imageUrl, { tryInstantView: true });
    };

    const shareOnFB = async () => {
        await exportLineup();
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;
        window.open(shareUrl, "_blank");
    };

    const shareOnTelegram = async () => {
        await exportLineup();
        utils.shareURL(
            imageUrl,
            "Check out my dream team lineup! Visit https://t.me/aerena_bot"
        );
    };

    const setSampleURL = async () => {
        isExporting(true);
        const result = await sampleURL(user.id, "dreamteam", user.initDataRaw);
        setCurrentlySample(true);
        setImageUrl(result.imageUrl);
        isExporting(false);
    };

    useEffect(() => {
        setSampleURL();
    }, [lineupRef.current]);

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
                            <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
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
                                    <p className="pt-[0.2vw] font-russoone text-[1.8vw] text-white">
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
                    <div className="flex h-[10vw] w-[80vw] items-center justify-center">
                        {/* <motion.div className="h-full" {...appearAnimation}>
                            <TelegramShareButton
                                url={imageUrl}
                                disabled={exporting}
                                disabledStyle={{ opacity: 0.5 }}
                                title={
                                    "Check out my dream team lineup! Visit https://t.me/aerena_bot"
                                }
                                beforeOnClick={() => exportLineup()}
                            >
                                <TelegramIcon
                                    className="h-[10vw]"
                                    round={true}
                                />
                            </TelegramShareButton>
                        </motion.div> */}
                        <motion.button
                            className="h-[10vw]"
                            {...appearAnimation}
                            disabled={exporting}
                            onClick={shareOnTelegram}
                        >
                            <TelegramIcon
                                className={`h-[10vw] ${exporting ? "opacity-50" : "opacity-100"}`} /* opacity-75 for differentiating */
                                round={true}
                            />
                        </motion.button>
                        <motion.button
                            className="h-[10vw]"
                            {...appearAnimation}
                            disabled={exporting}
                            onClick={downloadImage}
                        >
                            <TelegramIcon
                                className={`h-[10vw] ${exporting ? "opacity-50" : "opacity-75"}`} /* opacity-75 for differentiating */
                                round={true}
                            />
                        </motion.button>
                        <motion.button
                            className="h-[10vw]"
                            {...appearAnimation}
                            disabled={exporting}
                            onClick={downloadImageBrowser}
                        >
                            <TelegramIcon
                                className={`h-[10vw] ${exporting ? "opacity-50" : "opacity-75"}`} /* opacity-75 for differentiating */
                                round={true}
                            />
                        </motion.button>
                        <motion.button
                            className="h-[10vw]"
                            {...appearAnimation}
                            disabled={exporting}
                            onClick={downloadImageInstantView}
                        >
                            <TelegramIcon
                                className={`h-[10vw] ${exporting ? "opacity-50" : "opacity-75"}`} /* opacity-75 for differentiating */
                                round={true}
                            />
                        </motion.button>
                        {/* <motion.div className="h-[10vw]" {...appearAnimation}>
                            <FacebookShareButton
                                url={imageUrl}
                                disabled={exporting}
                                disabledStyle={{ opacity: 0.5 }}
                                beforeOnClick={() => exportLineup()}
                            >
                                <FacebookIcon
                                    className="h-[10vw]"
                                    round={true}
                                />
                            </FacebookShareButton>
                        </motion.div> */}

                        <motion.button
                            className="h-[10vw]"
                            {...appearAnimation}
                            disabled={exporting}
                            onClick={shareOnFB}
                        >
                            <FacebookIcon
                                className={`h-[10vw] ${exporting ? "opacity-50" : "opacity-75"}`} /* opacity-75 for differentiating */
                                round={true}
                            />
                        </motion.button>
                    </div>
                    <div className="flex h-[10vw] w-[80vw] items-center justify-center">
                        <motion.button
                            className="h-[10vw]"
                            disabled={exporting}
                            onClick={onClose}
                            {...appearAnimation}
                        >
                            <img className="h-full" src={CloseIcon} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};
