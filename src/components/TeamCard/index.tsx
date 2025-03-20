import {
    Back,
    BackWings,
    BackWingsShine,
    Base,
    BaseDarken,
    BaseShadow,
    Dust,
    Fangs,
    FangsAccent,
    FangsShadow,
    FrontWings,
    FrontWingsShadow,
    FrontWingsShine,
    Knives,
    KnivesAccent,
    KnivesShadow,
    KnivesShine,
    Line,
    Logo,
    LogoAccent,
    LogoBase,
    LogoDarken,
    LogoOutline,
    LogoShadow,
    MiddleWings,
    MiddleWingsShadow,
    MiddleWingsShine,
    Team,
    Wave,
} from "./Layers";

import { TeamColor } from "../../helpers/interfaces";

interface Props {
    color: TeamColor;
    team: string;
}

export const TeamCard = ({ color, team }: Props) => {
    return (
        <div className="relative h-full w-full">
            <div className="absolute h-full w-full">
                <Back color={color} team={team} />
            </div>
            <div className="absolute h-full w-full">
                <BackWings color={color} team={team} />
            </div>
            <div className="absolute h-full w-full">
                <BackWingsShine />
            </div>
            <div className="absolute h-full w-full">
                <BaseShadow team={team} />
            </div>
            <div className="absolute h-full w-full">
                <Base color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Wave team={team} />
            </div>
            <div className="absolute h-full w-full">
                <Dust color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Line color={color} team={team} />
            </div>
            <div className="absolute h-full w-full">
                <MiddleWingsShadow team={team} />
            </div>
            <div className="absolute h-full w-full">
                <MiddleWings color={color} team={team} />
            </div>
            <div className="absolute h-full w-full">
                <MiddleWingsShine />
            </div>
            <div className="absolute h-full w-full">
                <FangsShadow color={color} team={team} />
            </div>
            <div className="absolute h-full w-full">
                <Fangs color={color} />
            </div>
            <div className="absolute h-full w-full">
                <FangsAccent color={color} />
            </div>
            <div className="absolute h-full w-full">
                <BaseDarken />
            </div>
            <div className="absolute h-full w-full">
                <Team color={color} team={team} />
            </div>
            <div className="absolute h-full w-full">
                <KnivesShadow team={team} />
            </div>
            <div className="absolute h-full w-full">
                <KnivesAccent color={color} />
            </div>
            <div className="absolute h-full w-full">
                <Knives color={color} team={team} />
            </div>
            <div className="absolute h-full w-full">
                <KnivesShine />
            </div>
            <div className="absolute h-full w-full">
                <FrontWingsShadow team={team} />
            </div>
            <div className="absolute h-full w-full">
                <FrontWings color={color} team={team} />
            </div>
            <div className="absolute h-full w-full">
                <FrontWingsShine />
            </div>
            <div className="absolute h-full w-full">
                <LogoShadow team={team} />
            </div>
            <div className="absolute h-full w-full">
                <LogoOutline color={color} team={team} />
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
            <div className="absolute h-full w-full">
                <LogoDarken />
            </div>
        </div>
    );
};
