import {
    Back,
    Base,
    BigDiamond,
    BottomDiamond,
    BottomWings,
    BottomWingsAccent,
    Darken,
    Dust,
    Glow,
    Line,
    Logo,
    MiddleDiamond,
    Outline,
    SmallDiamond,
    Team,
    TopWings,
    TopWingsAccent,
    Wave,
} from "./assets";

import { TeamColor } from "../../helpers/interfaces";

interface Props {
    color: TeamColor;
    team: string;
    opacity: { wave: string };
}

export const X = ({ color, team, opacity }: Props) => {
    return (
        <div className="relative h-full w-full">
            <div className="absolute h-full w-full">
                <Glow />
            </div>
            <div className="absolute h-full w-full">
                <Back color={color} />
            </div>
            <div className="absolute h-full w-full">
                <BigDiamond color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Base color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Wave opacity={opacity} />
            </div>
            <div className="absolute h-full w-full">
                <Dust color={color} />
            </div>
            <div className="absolute h-full w-full">
                <BottomWingsAccent color={color} />
            </div>
            <div className="absolute h-full w-full">
                <BottomWings color={color} />
            </div>
            <div className="absolute h-full w-full">
                <TopWingsAccent color={color} />
            </div>
            <div className="absolute h-full w-full">
                <TopWings color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Logo color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Line color={color} />
            </div>
            <div className="absolute h-full w-full">
                <MiddleDiamond color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Darken />
            </div>
            <div className="absolute h-full w-full">
                <Team color={color} team={team} />
            </div>
            <div className="absolute h-full w-full">
                <BottomDiamond color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Outline color={color} />
            </div>
            <div className="absolute h-full w-full">
                <SmallDiamond color={color} />
            </div>
        </div>
    );
};
