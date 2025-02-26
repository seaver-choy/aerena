import {
    Back,
    Base,
    BigDiamond,
    BorderBasic,
    BottomDiamond,
    BottomWings,
    BottomWingsAccent,
    Darken,
    Dust,
    Glow,
    GlowBasic,
    IGN,
    Line,
    Logo,
    MiddleDiamond,
    Outline,
    Role,
    SmallDiamond,
    TopWings,
    TopWingsAccent,
    Wave,
} from "./assets";

import { getAthleteSticker } from "../../helpers/athletes";
import PH15Card from "../../assets/card/ph15.svg";

import { TeamColor } from "../../helpers/interfaces";
interface Props {
    color: TeamColor;
    ign: string;
    opacity: { wave: string };
    role: string;
    league?: string;
    type?: string;
    id?: number;
}
export const AthleteCard = ({
    color,
    ign,
    opacity,
    role,
    type,
    league,
    id = -1,
}: Props) => {
    return (
        <div className="relative h-full w-full backface-hidden">
            <div className="absolute h-full w-full">
                {type !== undefined && type === "basic" ? (
                    <GlowBasic id={id} />
                ) : (
                    <Glow id={id} />
                )}
            </div>
            <div className="absolute h-full w-full">
                <Back color={color} id={id} />
            </div>
            <div className="absolute h-full w-full">
                <BigDiamond color={color} id={id} />
            </div>
            <div className="absolute h-full w-full">
                <Base color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Wave opacity={opacity} id={id} />
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
                <Role color={color} role={role} />
            </div>
            <div className="absolute h-full w-full">
                <MiddleDiamond color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Darken />
            </div>
            <div className="absolute h-full w-full">
                <IGN color={color} ign={ign} />
            </div>
            <div className="absolute h-full w-full">
                <BottomDiamond color={color} id={id} />
            </div>
            <div className="absolute h-full w-full">
                <Outline color={color} id={id} />
            </div>
            <div className="absolute h-full w-full">
                <SmallDiamond color={color} />
            </div>
            {type !== undefined && type === "basic" && (
                <>
                    <div className="absolute h-full w-full">
                        <BorderBasic id={id} />
                    </div>
                    <div className="absolute h-full w-full">
                        <img
                            className="h-full w-full"
                            src={
                                league !== undefined
                                    ? getAthleteSticker(league)
                                    : PH15Card
                            }
                            draggable={false}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
