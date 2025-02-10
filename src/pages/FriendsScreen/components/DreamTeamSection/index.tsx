import { DreamTeamTitle } from "../DreamTeamTitle";
import { DreamTeam } from "../DreamTeam";

import LineupBackground from "../../../../assets/background/lineup.svg";
import LineupButton from "../../../../assets/button/lineup.svg";

export const DreamTeamSection = () => {
    return (
        <div className="mt-[4vw] h-[120vw]">
            <div className="relative flex justify-center">
                <img className="h-full w-full" src={LineupBackground} />
                <DreamTeamTitle />
                <DreamTeam />
                <div className="absolute bottom-[3vw] flex h-[7.2vh] w-[56vw] items-end">
                    <button className="relative w-full items-center justify-center">
                        <div className="absolute flex h-full w-full items-center justify-center">
                            <p className="pt-[0.6vw] font-russoone text-[3vw] text-white">
                                Share Lineup
                            </p>
                        </div>
                        <img className="h-full w-full" src={LineupButton} />
                    </button>
                </div>
            </div>
        </div>
    );
};
