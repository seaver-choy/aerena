import { Layout } from "../../components/Layout";
import Upgrading from "../../assets/others/upgrading.svg";

import { AthleteCard } from "../../components/AthleteCard";

// const AnimatedText = ({ text }: { text: string }) => {
//     const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//     const textArray = text.toUpperCase().split("");
//     const motionValues = useRef(textArray.map(() => useMotionValue(0))).current;
//     const transforms = useRef(
//         motionValues.map((mv, index) =>
//             useTransform(mv, (latest) => {
//                 if (latest === 1) return textArray[index];
//                 const charIndex = Math.floor(latest * alphabet.length);
//                 return alphabet[charIndex];
//             })
//         )
//     ).current;

//     useEffect(() => {
//         const animationControls = [];

//         if (textArray.length > 0) {
//             textArray.forEach((_, i) => {
//                 const mv = motionValues[i];
//                 const delay = i * 0.3;

//                 const controls = animate(mv, 1, {
//                     duration: 1,
//                     delay,
//                     ease: "linear",
//                     repeat: 0,
//                 });

//                 animationControls.push(controls);
//             });
//         }

//         return () => {
//             animationControls.forEach((control) => control.stop());
//         };
//     }, [text]);

//     return (
//         <motion.span className="font-russoone text-[5vw] text-white">
//             {textArray.map((_, i) => (
//                 <motion.span key={i} style={{ display: "inline-block" }}>
//                     {transforms[i]}
//                 </motion.span>
//             ))}
//         </motion.span>
//     );
// };

export const FriendsScreen = () => {
    const athlete = {
        ign: "KELRA",
        role: "Gold",
    };

    const ign = athlete.ign;
    const role = athlete.role;

    const team = {
        main: "#333",
        light: "#D8A956",
        dark: "#AB750F",
        accent: "#fff",
        details: "#fff",
        wave: "0.15",
    };

    const colors = {
        main: team.main,
        light: team.light,
        dark: team.dark,
        accent: team.accent,
        details: team.details,
        wave: team.wave,
    };

    return (
        <Layout>
            <div className="flex h-full items-center justify-center">
                {/* <img className="h-[80vw] w-[80vw]" src={Upgrading} /> */}
                <AthleteCard
                    color={colors}
                    ign={ign}
                    role={role}
                    opacity={colors}
                />
            </div>
        </Layout>
    );
};
