import { useEffect, useState } from "react";
import { useUsers } from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { Token, Tournament } from "../../../../helpers/interfaces";
import { getStickerImage } from "../../../../helpers/images";
import { TeamColor } from "../../../../helpers/interfaces";
import { getBaseTeamColor } from "../../../../helpers/athletes";
import { AthleteCard } from "../../../../components/AthleteCard";

import EmptyBoardBackground from "../../../../assets/background/board-empty.svg";
import BasicBoardBackground from "../../../../assets/background/board-basic.svg";

interface PersonalLineupProps {
    ongoingTournament: Tournament;
    showTournament: boolean;
    playTab: string;
}

interface UsersJoined {
    username: string;
    lineup: Token[];
    score: number;
}

export const PersonalLineup = ({
    ongoingTournament,
    showTournament,
    playTab,
}: PersonalLineupProps) => {
    const user = useUsers();
    const navigate = useNavigate();
    const [userLineups, setUserLineups] = useState<UsersJoined[]>(null);
    const [baseColor] = useState<TeamColor>(getBaseTeamColor());
    const fetchUserLineups = () => {
        if (ongoingTournament.usersJoined.length > 0) {
            const filteredUserLineups = ongoingTournament.usersJoined.filter(
                (currentUser) => currentUser.username === user.username
            ).reverse();
            setUserLineups(filteredUserLineups);
        } else setUserLineups([]);
    };

    const handleCommunityLineups = () => {
        navigate(`/community-lineups`, {
            state: { ongoingTournament, playTab },
        });
    };

    useEffect(() => {
        if (ongoingTournament != null) fetchUserLineups();
    }, [ongoingTournament]);

    return (
        showTournament &&
        ongoingTournament != null && (
            <div className="mt-[8vw] flex flex-col gap-[4vw]">
                {userLineups != null && userLineups.length == 0 && (
                    <div className="relative h-[49.7vw] w-full">
                        <img
                            className="h-full w-full"
                            src={EmptyBoardBackground}
                        />
                        <div className="absolute right-[7.5vw] top-[1.4vw] flex h-[9vw] w-[15vw] flex-col items-center opacity-50">
                            <p className="font-russoone text-[2.5vw] text-white">
                                POINTS
                            </p>
                            <p className="-mt-[2vw] font-russoone text-[6vw] text-white">
                                0
                            </p>
                        </div>
                        <div className="absolute left-[5vw] top-[18vw] flex h-[22vw] w-[90%] flex-col">
                            <div className="flex w-full justify-center">
                                <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[5vw] font-normal text-transparent">
                                    Ready to win exciting prizes?
                                </p>
                            </div>
                            <div className="flex w-full justify-center">
                                <p className="bg-gradient-to-b from-golddark via-goldlight to-golddark bg-clip-text text-center font-montserrat text-[4vw] font-normal text-transparent">
                                    Enter your lineups now for unlimited chances
                                    to win amazing prizes!
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {userLineups != null &&
                    userLineups.length > 0 &&
                    ongoingTournament.usersJoined.map(
                        (userInfo, index) =>
                            userInfo.username === user.username && (
                                <div key={index} className="relative h-[109.5vw] w-full">
                                    <img
                                        className="h-full w-full"
                                        src={BasicBoardBackground}
                                    />
                                    <div className="absolute left-[7.2vw] top-[1.2vw] flex h-[5.7vw] w-[27vw] items-center justify-center">
                                        <p className="mt-[0.5vw] font-russoone text-[2.5vw] text-white">
                                            JOINED
                                        </p>
                                    </div>
                                    <div className="absolute right-[7.5vw] top-[1.4vw] flex h-[9vw] w-[15vw] flex-col items-center">
                                        <p className="font-russoone text-[2.5vw] text-white">
                                            POINTS
                                        </p>
                                        <p className="-mt-[2vw] font-russoone text-[6vw] text-white">
                                            {userInfo.score}
                                        </p>
                                    </div>
                                    <div className="absolute left-[6vw] top-[11.3vw] flex h-[6.5vw] w-[60vw] items-center">
                                        <p className="bg-gradient-to-r from-golddark via-goldlight to-golddark bg-clip-text font-russoone text-[4vw] text-transparent">
                                            {ongoingTournament.tournamentName}
                                        </p>
                                    </div>
                                    <div className="absolute left-[4vw] top-[21vw] flex h-[76.8vw] w-[92vw] flex-row flex-wrap items-center justify-center gap-[4vw]">
                                        {userInfo.lineup.map((athlete, index) => (
                                            <div key={index} className="relative flex h-[36.4vw] w-[28vw]">
                                                {/* <img
                                                    className="h-full"
                                                    src={athlete.img}
                                                /> */}
                                                <AthleteCard
                                                    color={baseColor}
                                                    ign={athlete.displayName}
                                                    role={athlete.position[0]}
                                                    opacity={{
                                                        wave: baseColor.wave,
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-[1.4vw] left-[1.8vw] h-[12vw] w-[12vw]">
                                        <img
                                            className="h-full w-full"
                                            src={getStickerImage(
                                                ongoingTournament.league
                                            )}
                                        />
                                    </div>
                                    <div className="absolute bottom-[2.1vw] right-[2vw] h-[8vw] w-[25vw]">
                                        <div className="relative flex h-full w-full">
                                            <div className="h-full w-full rounded-[1vw] bg-gray"></div>
                                            <div className="absolute flex h-full w-full items-center justify-center">
                                                <p className="mt-[0.5vw] font-russoone text-[3.5vw] text-white">
                                                    SHARE
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    )}
                <button
                    className="mx-[4vw] mt-[4vw] flex h-[10vw] items-center justify-center rounded-[2.5vw] bg-gray"
                    onClick={handleCommunityLineups}
                >
                    <p className="font-russoone text-[3.5vw] text-white">
                        View Community Lineups
                    </p>
                </button>
            </div>
        )
    );
};
