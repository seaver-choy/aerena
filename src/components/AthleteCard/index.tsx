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
    Sticker,
    TopWings,
    TopWingsAccent,
    Wave,
} from "./assets";

import { TeamColor } from "../../helpers/interfaces";
interface Props {
    color: TeamColor;
    ign: string;
    opacity: { wave: string };
    role: string;
    type?: string;
}
export const AthleteCard = ({ color, ign, opacity, role, type }: Props) => {
    return (
        <div className="relative h-full w-full">
            <div className="absolute h-full w-full">
                {type !== undefined && type === "basic" ? (
                    <GlowBasic />
                ) : (
                    <Glow />
                )}
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
                <BottomDiamond color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Outline color={color} />
            </div>
            <div className="absolute h-full w-full">
                <SmallDiamond color={color} />
            </div>
            <div className="absolute h-full w-full">
                <BorderBasic />
            </div>
            <div className="absolute h-full w-full">
                <Sticker />
            </div>
        </div>
    );
};
