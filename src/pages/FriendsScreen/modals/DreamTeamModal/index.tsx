import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
    appearAnimation,
    appearTextAnimation,
    appearModalAnimation,
} from "../../../../helpers/animation";

import DreamTeamBackground from "../../../../assets/background/dream-team.svg";
import LineupBackground from "../../../../assets/background/lineup.svg";
import LineupButton from "../../../../assets/button/lineup.svg";
import CloseIcon from "../../../../assets/icon/close.svg";
import * as htmlToImage from "html-to-image";
import { DreamTeam, TeamColor } from "../../../../helpers/interfaces";
import { AthleteCard } from "../../../../components/AthleteCard";
import { getBaseTeamColor } from "../../../../helpers/athletes";
import {
    // EmailIcon,
    // FacebookIcon,
    // FacebookShareButton,
    // XIcon,
    TelegramIcon,
} from "react-share";
// import { initUtils } from "@telegram-apps/sdk-react";
// import { useUsers } from "../../../../hooks/useUser";
interface DreamTeamModalProps {
    dreamTeam: DreamTeam;
    onClose: () => void;
    // isExporting: boolean;
    // setIsExporting: (isExporting: boolean) => void;
    // setShareData: (data: ShareData) => void;
}

export const DreamTeamModal = ({ dreamTeam, onClose }: DreamTeamModalProps) => {
    // const user = useUsers();
    const lineupRef = useRef<HTMLDivElement>(null);
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());
    // const utils = initUtils();
    // const YOUR_FACEBOOK_TOKEN =
    //     "EAALmPqUAeYIBO1t15cjD9V1CvRWcm0VvZBbRGCBgQHIQabmdvZCrXI6iTwiqpMBa8GIadqZB3AAAYJBYFPxKSPI68xRQ3QwdZACrziWU3bNLJ90ooKE8sLsspmCMNqT7k7MvV0RF8jJr3PQX2TBTLH7te2A1N4XU4YYFzT7569dZCHJJXPcZB6DAPYDypfbhgtfhD9mIGtGiVIqhZCIlRoX3kMUR53a3Ll8goSZCHDo5rQZB4BA4lN4ZALtPALj1cz2AZDZD";

    const exportLineup = async () => {
        if (!lineupRef.current) return;

        try {
            const dataUrl = await htmlToImage.toPng(lineupRef.current, {
                cacheBust: true,
                pixelRatio: 2,
            });

            // const link = document.createElement("a");
            // link.download = "dream-team-lineup.png";
            // link.href = dataUrl;
            // link.click();

            // URL.revokeObjectURL(dataUrl);
            // Convert dataURL to blob

            /* navigator.share */
            const blob = await fetch(dataUrl).then((r) => r.blob());
            const file = new File([blob], "dream-team-lineup.png", {
                type: "image/png",
                lastModified: Date.now(),
            });
            const shareData = {
                title: "Dream Team Lineup",
                text: "Check out my dream team lineup! Visit https://t.me/aerena_bot",
                // url: "https://t.me/aerena_bot",
                files: [file],
            };
            await navigator.share(shareData);

            // const canvas = document.createElement("canvas");
            // const ctx = canvas.getContext("2d");
            // if (!ctx) throw new Error("Failed to get canvas context");

            // const img = new Image();
            // img.onload = () => {
            //     // Set canvas dimensions to match image
            //     canvas.width = img.width;
            //     canvas.height = img.height;

            //     // Draw image on canvas
            //     ctx.drawImage(img, 0, 0);
            // };

            // img.src = dataUrl;
            // return new Promise<string>((resolve) => {
            //     img.onload = () => resolve(canvas.toDataURL("image/png", 1.0));
            // });
        } catch (error) {
            console.error("Error exporting lineup:", error);
            alert(error);
        } finally {
            // setIsExporting(false);
        }
    };

    // const imageCanvas = async () => {
    //     if (!lineupRef.current) return "";

    //     return new Promise((resolve, reject) => {
    //         const canvas = document.createElement("canvas");
    //         const ctx = canvas.getContext("2d");

    //         if (!ctx) {
    //             reject(new Error("Failed to get canvas context"));
    //             return;
    //         }

    //         const div = lineupRef.current;
    //         canvas.width = div.offsetWidth;
    //         canvas.height = div.offsetHeight;

    //         // Convert div to image
    //         htmlToImage
    //             .toCanvas(div, {
    //                 cacheBust: true,
    //                 pixelRatio: 2,
    //             })
    //             .then(() => {
    //                 resolve(canvas.toDataURL("image/png", 1.0));
    //             })
    //             .catch((error) => {
    //                 reject(
    //                     new Error(
    //                         `Failed to convert div to image: ${error.message}`
    //                     )
    //                 );
    //             });
    //     });
    // };

    // const shareOnFacebook = async (): Promise<void> => {
    //     const shareUrl = await imageCanvas();
    //     const blob = await convertDataURIToBlob(shareUrl);

    //     const formData = new FormData();
    //     formData.append("access_token", YOUR_FACEBOOK_TOKEN);
    //     formData.append("source", blob);
    //     formData.append("message", "Hello!");
    //     console.log(formData);
    //     try {
    //         const response = await fetch(
    //             `https://graph.facebook.com/v13.0/me/media`,
    //             {
    //                 method: "POST",
    //                 body: formData,
    //                 cache: "no-store",
    //             }
    //         );

    //         const result = await response.json();

    //         if (!response.ok) {
    //             throw new Error(`Facebook API error: ${result.error?.message}`);
    //         }

    //         console.log("Post successful:", result);
    //     } catch (error) {
    //         console.error("Error sharing to Facebook:", error);
    //         throw error;
    //     }
    // };

    // const convertDataURIToBlob = async (dataURI): Promise<Blob> => {
    //     const byteString = atob(dataURI.split(",")[1]);
    //     const ab = new ArrayBuffer(byteString.length);
    //     const ia = new Uint8Array(ab);

    //     for (let i = 0; i < byteString.length; i++) {
    //         ia[i] = byteString.charCodeAt(i);
    //     }

    //     return new Blob([ab], { type: "image/png" });
    // };

    // useEffect(() => {
    //     console.log(isExporting);
    //     if (isExporting) {
    //         console.log("here");
    //         exportLineup();
    //     }
    // }, [isExporting]);

    // const savePreparedInlineMessageWithImage = async () => {
    //     const token = "7797240127:AAGTbgSg7Ot9OO7wkz_6gpYZVKQFxmBHVV4";

    //     try {
    //         if (!lineupRef.current) return;

    //         const dataUrl = await htmlToImage.toPng(lineupRef.current, {
    //             cacheBust: true,
    //             pixelRatio: 2,
    //         });

    //         // const link = document.createElement("a");
    //         // link.download = "dream-team-lineup.png";
    //         // link.href = dataUrl;
    //         // link.click();

    //         // URL.revokeObjectURL(dataUrl);
    //         // Convert dataURL to blob
    //         const blob = await fetch(dataUrl).then((r) => r.blob());
    //         const file = new File([blob], "dream-team-lineup.png", {
    //             type: "image/png",
    //             lastModified: Date.now(),
    //         });

    //         // Then save the prepared inline message
    //         const preparedMessageResponse = await fetch(
    //             `https://api.telegram.org/bot${token}/savePreparedInlineMessage`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     text: "Hello!",
    //                     parse_mode: "HTML",
    //                     result: file,
    //                     user_id: user.id,
    //                     allow_user_chats: true,
    //                     allow_group_chats: true,
    //                 }),
    //             }
    //         );

    //         console.log(await preparedMessageResponse.json());
    //     } catch (error) {
    //         console.error("Error saving message:", error);
    //         throw error;
    //     }
    // };

    // const handleTelegram = () => {
    //     utils.shareURL("https://google.com", "Well Hello There!");
    // };

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
                    <motion.div
                        className="relative flex h-[80vw] w-[80vw] justify-center"
                        {...appearModalAnimation}
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
                        <motion.div
                            className="absolute top-[10.5vw] overflow-hidden"
                            {...appearTextAnimation}
                        >
                            <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent will-change-transform backface-hidden">
                                {dreamTeam.teamProfile != null &&
                                dreamTeam.teamProfile.key != undefined
                                    ? dreamTeam.teamProfile.key
                                    : "My Dream Team"}
                            </p>
                        </motion.div>
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
                    </motion.div>
                    <div className="flex h-[10vw] w-[80vw] items-center justify-center">
                        {/* <motion.button
                            className="h-[10vw]"
                            onClick={exportLineup}
                            {...appearAnimation}
                        >
                            <EmailIcon className="h-full" round={true} />
                        </motion.button> */}
                        <motion.button
                            className="h-[10vw]"
                            onClick={exportLineup}
                            {...appearAnimation}
                        >
                            <TelegramIcon className="h-full" round={true} />
                        </motion.button>
                        {/* <motion.button
                            className="h-[10vw]"
                            onClick={exportLineup}
                            {...appearAnimation}
                        >
                            <FacebookIcon className="h-full" round={true} />
                        </motion.button>
                        <motion.button
                            className="h-[10vw]"
                            onClick={exportLineup}
                            {...appearAnimation}
                        >
                            <XIcon className="h-full" round={true} />
                        </motion.button>
                        <motion.button
                            className="h-[10vw]"
                            onClick={shareOnFacebook}
                            {...appearAnimation}
                        >
                            <FacebookIcon className="h-full" round={true} />
                        </motion.button> */}
                    </div>
                    <div className="flex h-[10vw] w-[80vw] items-center justify-center">
                        <motion.button
                            className="h-[10vw]"
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
