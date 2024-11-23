/* eslint-disable @typescript-eslint/no-explicit-any */
import { address, SenderArguments, toNano } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { AerenaCollection } from "../../../../../ton/wrappers/AerenaCollection";
import BackgroundMainStatistics from "../../../../assets/background-mainstatistics.svg";
import ButtonGold from "../../../../assets/button-gold.svg";
import IconClose from "../../../../assets/icon-close.svg";
import IconStickerM6 from "../../../../assets/icon-sticker-m6.svg";
import ModalLarge from "../../../../assets/modal-large.svg";
import { useTonClient } from "../../../../hooks/useTonClient";
interface AthleteModalProps {
    cancel: () => void;
    selectedAthlete: any;
    showMintButton: boolean
}

export const AthleteModal = ({
    cancel,
    selectedAthlete,
    showMintButton
}: AthleteModalProps) => {
    const [tonConnectUI] = useTonConnectUI();
    const { client } = useTonClient();
    const aerenaAddress = address(
        "Ef-0Qjjoiu3ULRsEJ8WP0I-P6hMhE9B3a9l5dGqFPHpXhU-K"
    );

    const mint = async () => {
        if (tonConnectUI.account?.address) {
            try {
                const aerenaCollection =
                    await AerenaCollection.createFromAddress(aerenaAddress);
                const providerTest = client.provider(
                    aerenaAddress //TODO: also same address of collection?
                );
                console.log(providerTest);
                console.log(selectedAthlete);
                console.log(`owner: ${address(tonConnectUI.account?.address)}`);
                console.log(selectedAthlete.img);
                await aerenaCollection.sendMint(
                    providerTest,
                    {
                        address: address(tonConnectUI.account?.address),
                        send: async (args: SenderArguments) => {
                            tonConnectUI.sendTransaction({
                                messages: [
                                    {
                                        address: args.to.toString(),
                                        amount: args.value.toString(),
                                        payload: args.body
                                            ?.toBoc()
                                            .toString("base64"),
                                    },
                                ],
                                validUntil: Date.now() + 5 * 60 * 1000,
                            });
                        },
                    },
                    {
                        queryId: 1,
                        owner: address(tonConnectUI.account?.address),
                        nftId: 1,
                        nftAmount: toNano("0.05"),
                        contentUrl: selectedAthlete.img,
                        gas: toNano("0.2"),
                    }
                );
                console.log("Done submit?");
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-40">
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="h-full w-full bg-graydark opacity-95" />
                <div className="absolute z-40 h-[115vw] w-[80vw] animate-modal">
                    <img className="h-full w-full" src={ModalLarge} />
                </div>
                <div className="absolute z-50 flex h-[99vw] w-[66vw] animate-modal flex-col justify-center">
                    <div className="flex h-[11vw] flex-col items-center gap-[2vw]">
                        <p className="mt-[2vw] bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] font-normal text-transparent">
                            Athlete Profile
                        </p>
                        <button
                            className="absolute right-0 h-[5vw] w-[5vw]"
                            onClick={cancel}
                        >
                            <img className="h-full w-full" src={IconClose} />
                        </button>
                    </div>
                    <div className="relative mb-[2vw] flex h-[45vw] animate-modal justify-center">
                        <img className="h-[100%]" src={selectedAthlete?.img} />
                    </div>
                    <div className="mb-[2vw] flex h-[16vw] flex-row justify-center gap-[2vw] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex h-full w-[20vw] animate-modal flex-col items-center justify-center">
                            <img className="h-[10vw]" src={IconStickerM6} />
                            <p className="mt-[0.5vw] text-nowrap bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-montserrat text-[2.5vw] font-extrabold text-transparent"></p>
                        </div>
                    </div>
                    <div className="mb-[4vw] flex h-[11.5vw] gap-[2vw]">
                        <div className="relative flex h-full w-[21vw] justify-center">
                            <img
                                className="h-full"
                                src={BackgroundMainStatistics}
                            />
                            <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2vw] font-normal text-transparent">
                                    KILLS
                                </p>
                                <p className="font-russoone text-[4vw] font-normal text-white">
                                    {selectedAthlete.avgKills}
                                </p>
                            </div>
                        </div>
                        <div className="relative flex h-full w-[21vw] justify-center">
                            <img
                                className="h-full"
                                src={BackgroundMainStatistics}
                            />
                            <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2vw] font-normal text-transparent">
                                    ASSISTS
                                </p>
                                <p className="font-russoone text-[4vw] font-normal text-white">
                                    {selectedAthlete.avgAssists}
                                </p>
                            </div>
                        </div>
                        <div className="relative flex h-full w-[21vw] justify-center">
                            <img
                                className="h-full"
                                src={BackgroundMainStatistics}
                            />
                            <div className="absolute flex h-full w-full flex-col items-center justify-center">
                                <p className="mt-[0.8vw] bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[2vw] font-normal text-transparent">
                                    KDA
                                </p>
                                <p className="font-russoone text-[4vw] font-normal text-white">
                                    {selectedAthlete.kda}
                                </p>
                            </div>
                        </div>
                    </div>
                    {showMintButton ? 
                    (<div className="flex h-[7.5vw] justify-center">
                        <div className="flex h-full w-full justify-end">
                            <button
                                className="relative flex h-full w-full justify-center"
                                disabled={false}
                                onClick={mint}
                            >
                                <img className="h-full" src={ButtonGold} />
                                <div className="absolute flex h-full w-full items-center justify-center gap-[1vw]">
                                    <p className="mt-[0.2vw] font-russoone text-[2.8vw] font-normal text-white">
                                        Mint
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>): 
                    (<></>)
                    }
                </div>
            </div>
        </div>
    );
};
