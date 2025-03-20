import { TitleSection } from "../../../../components/TitleSection";
import { MatchBanner } from "../MatchBanner";

export const FeaturedSchedule = () => {
    return (
        <div>
            <TitleSection title="Day 1" />
            <MatchBanner />
            <MatchBanner />
            <TitleSection title="Day 2" />
            <MatchBanner />
            <MatchBanner />
            <MatchBanner />
            <TitleSection title="Day 3" />
            <MatchBanner />
            <MatchBanner />
        </div>
    );
};
