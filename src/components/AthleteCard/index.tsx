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

export const AthleteCard = ({ color, ign, opacity, role }) => {
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
        </div>
    );
};
