import {
    Back,
    BackWings,
    Base,
    Fangs,
    FangsAccent,
    FangsShadow,
    FrontWings,
    Knives,
    KnivesAccent,
    Logo,
    LogoAccent,
    LogoBase,
    LogoOutline,
    MiddleWings,
} from "./Layers";

import { TeamColor } from "../../helpers/interfaces";

interface Props {
    color: TeamColor;
}

export const TeamCard = ({ color }: Props) => {
    return (
        <div className="relative h-full w-full">
            <div className="absolute h-full w-full">
                <Back color={color} />
            </div>
            <div className="absolute h-full w-full">
                <BackWings color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Base color={color} />
            </div>
            <div className="absolute h-full w-full">
                <MiddleWings color={color} />
            </div>
            <div className="absolute h-full w-full">
                <FangsShadow color={color} />
            </div>
            <div className="absolute h-full w-full">
                <FangsAccent color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Fangs color={color} />
            </div>
            <div className="absolute h-full w-full">
                <KnivesAccent color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Knives color={color} />
            </div>
            <div className="absolute h-full w-full">
                <FrontWings color={color} />
            </div>
            <div className="absolute h-full w-full">
                <LogoOutline color={color} />
            </div>
            <div className="absolute h-full w-full">
                <LogoBase color={color} />
            </div>
            <div className="absolute h-full w-full">
                <LogoAccent color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Logo color={color} />
            </div>
        </div>
    );
};
