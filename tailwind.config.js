import { transform } from "esbuild";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                loading: "#EAEAEA",
                light: "#F5F1EE",
                graydark: "#212121",
                gray: "#2D2D2D",
                graylight: "#383838",
                golddark: "#AB750F",
                gold: "#CD9C44",
                goldlight: "#D8A956",
                cream: "#F4E8D5",
                blue: "#003153",
                cyan: "#0DF5E7",
                red: "#D87D7D",
            },
            fontFamily: {
                montserrat: ["Montserrat"],
                russoone: ["Russo One"],
                montagu: ["Montagu Slab"],
            },
            animation: {
                title: "fly-in-left 0.5s ease-in 1 forwards",
                modal: "browse-in 0.3s ease-in 1 forwards",
                mana: "fly-in-up 0.5s ease-in 1 forwards",
                dust: "burst-s 2s ease-in-out 1",
                glow: "burst-l 2s ease-in-out 1",
                appear: "browse-in 0.4s ease-in 1",
                appear50: "browse-in-50 4s ease-in 1",
                disappear: "zoom-out 0.4s ease-out 1 forwards",
                flip: "flip-top-left 2s ease-in-out 1 forwards",
                sparkle: "sparkle 1s ease-in-out infinite forwards",
                static: "radiate 1s ease-in-out infinite forwards",
                bobble: "bobble 2s ease-in-out infinite forwards",
                open: "jiggle 1s ease-in-out 1, zoom-out 1s 1s ease-out 1 forwards",
                back: "browse-in 1s ease-in-out 1 forwards, bobble 2s 1s ease-in-out infinite forwards",
                text: "browse-in 1s ease-in 1 forwards, heartbeat 2s 1s ease-in-out infinite forwards",
                athlete:
                    "flip-left 0.5s ease-in-out forwards, bobble 2s 0.5s ease-in-out infinite forwards",
            },
            keyframes: {
                sparkle: {
                    "0%, 100%": {
                        transform: "scale(1)",
                        opacity: 100,
                    },
                    "50%": {
                        transform: "scale(1.005)",
                        opacity: 100,
                    },
                },
                radiate: {
                    "0%, 100%": {
                        transform: "scale(2)",
                        opacity: 100,
                    },
                    "50%": {
                        transform: "scale(2.2)",
                        opacity: 100,
                    },
                },
                "browse-in": {
                    "0%": {
                        opacity: 0,
                        transform: "scale(0.8) translateZ(0px)",
                        zIndex: "-1",
                    },
                    "10%": {
                        opacity: 70,
                        transform: "scale(0.8) translateZ(0px)",
                        zIndex: "-1",
                    },
                    "80%": {
                        opacity: 100,
                        transform: "scale(1.05) translateZ(0px)",
                        zIndex: "10",
                    },
                    "100%": {
                        transform: "scale(1) translateZ(0px)",
                        zIndex: "10",
                    },
                },
                "browse-in-50": {
                    "0%": {
                        opacity: 0,
                        transform: "scale(0.8) translateZ(0px)",
                        zIndex: "-1",
                    },
                    "10%": {
                        opacity: 50,
                        transform: "scale(0.8) translateZ(0px)",
                        zIndex: "-1",
                    },
                    "80%": {
                        opacity: 50,
                        transform: "scale(1.05) translateZ(0px)",
                        zIndex: "10",
                    },
                    "100%": {
                        opacity: 50,
                        transform: "scale(1) translateZ(0px)",
                        zIndex: "10",
                    },
                },
                "fly-in-up": {
                    "0%": {
                        opacity: 0,
                        transform: "translate3d(0, 100%, 0)",
                        transitionTimingFunction:
                            "cubic-bezier(0.215, 0.61, 0.355, 1)",
                    },
                    "80%": {
                        transform: "translate3d(0, -8%, 0)",
                    },
                    "100%": {
                        transform: "translate3d(0, 0, 0)",
                    },
                },
                "fly-in-left": {
                    "0%": {
                        opacity: 0,
                        transform: "translate3d(-100%, 0, 0)",
                        transitionTimingFunction:
                            "cubic-bezier(0.215, 0.61, 0.355, 1)",
                    },
                    "80%": {
                        transform: "translate3d(8%, 0, 0)",
                    },
                    "100%": {
                        transform: "translate3d(0, 0, 0)",
                    },
                },
                "flip-top-left": {
                    "0%": {
                        transform: "scale(1)",
                        opacity: 100,
                    },
                    "80%": {
                        transform: "scale(0.3) rotate(-4deg) translateY(-100%)",
                        opacity: 100,
                    },
                    "95%": {
                        transform: "rotateY(90deg)",
                        opacity: 100,
                    },
                    "100%": {
                        transform:
                            "translate3d(-100%, -100%, 0) scale(1) rotateY(180deg)",
                        opacity: 100,
                    },
                },
                "flip-left": {
                    "0%": {
                        transform:
                            "translate3d(-100%, -100%, 0) rotateY(-180deg)",
                        opacity: 100,
                    },
                    "50%": {
                        transform: "rotateY(-90deg)",
                        opacity: 100,
                    },
                    "100%": {
                        transform: "rotateY(0deg)",
                        opacity: 100,
                    },
                },
                "zoom-out": {
                    "0%": {
                        opacity: 100,
                    },
                    "15%": {
                        opacity: 80,
                        transform: "scale3d(1.1, 1.1, 1.1)",
                    },
                    "100%": {
                        opacity: 0,
                        transform: "scale3d(0.3, 0.3, 0.3)",
                    },
                },
                "burst-s": {
                    "0%": {
                        transform: "scale(0)",
                        opacity: 0,
                    },
                    "50%": {
                        transform: "scale(2)",
                        opacity: 100,
                    },
                    "100%": {
                        transform: "scale(1)",
                        opacity: 100,
                    },
                },
                "burst-l": {
                    "0%": {
                        transform: "scale(0)",
                        opacity: 0,
                    },
                    "50%": {
                        transform: "scale(3)",
                        opacity: 100,
                    },
                    "100%": {
                        transform: "scale(2)",
                        opacity: 100,
                    },
                },
                heartbeat: {
                    "0%, 100%": {
                        transform: "scale(1)",
                    },
                    "50%": {
                        transform: "scale(1.02)",
                    },
                },
                spark: {
                    "0%, 100%": {
                        opacity: 0,
                        transform: "scale(1)",
                    },
                    "50%": {
                        opacity: 100,
                        transform: "scale(1.02)",
                    },
                },
                bobble: {
                    "0%, 100%": {
                        transform: "translateY(0)",
                    },
                    "50%": {
                        transform: "translateY(-2%)",
                    },
                },
                jiggle: {
                    "0%": {
                        transform: "scale3d(1, 1, 1)",
                    },
                    "30%": {
                        transform: "scale3d(1.25, 0.75, 1)",
                    },
                    "40%": {
                        transform: "scale3d(0.75, 1.25, 1)",
                    },
                    "50%": {
                        transform: "scale3d(1.15, 0.85, 1)",
                    },
                    "65%": {
                        transform: "scale3d(0.95, 1.05, 1)",
                    },
                    "75%": {
                        transform: "scale3d(1.05, 0.95, 1)",
                    },
                    "100%": {
                        transform: "scale3d(1, 1, 1)",
                    },
                },

                "glide-in-up": {
                    "0%": {
                        transform: "translate3d(0, 5%, 0) scale(0.95)",
                    },
                    "100%": {
                        transform: "translate3d(0, 0, 0) scale(1)",
                    },
                },
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@xpd/tailwind-3dtransforms"),
    ],
};
