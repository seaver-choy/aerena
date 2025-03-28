import AerenaLogo from "../../assets/logo/aerena.svg";

export const Loading = () => {
    return (
        <div className="relative flex items-center justify-center">
            <div className="h-[20vw] w-[20vw] animate-spin rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-golddark via-gold to-light p-[1.5vw]">
                <div className="flex h-full w-full rounded-full bg-light"></div>
            </div>
            <img
                className="absolute mt-[4vw] h-[10vw] w-[10vw] animate-bounce"
                src={AerenaLogo}
            />
        </div>
    );
};
