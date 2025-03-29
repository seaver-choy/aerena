import TitleBackground from "../../assets/background/title.svg";

interface TitleSectionProps {
    title: string;
}

export const TitleSection = ({ title }: TitleSectionProps) => {
    return (
        <div className="mx-[8vw] mt-[6vw] h-[13.3vw]">
            <div className="relative flex items-center justify-center">
                <img className="h-full w-full" src={TitleBackground} />
                <div className="absolute mb-[1vw] flex h-[6.5vw] w-[40vw] items-center justify-center">
                    <p className="font-russoone text-[5vw] text-white">
                        {title}
                    </p>
                </div>
            </div>
        </div>
    );
};
