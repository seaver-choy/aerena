import { MotionProps, Variants } from "motion/react";

export const appearAnimation: MotionProps = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: {
        scale: {
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 20,
        },
        opacity: { duration: 0.2 },
    },
};

export const appearCardAnimation: MotionProps = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: {
        scale: {
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 20,
        },
        opacity: { duration: 0.2 },
    },
};

export const appearCardEmptyAnimation: MotionProps = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 0.5, scale: 1 },
    transition: {
        scale: {
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 20,
        },
        opacity: { duration: 0.2 },
    },
};

export const appearModalAnimation: MotionProps = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: {
        scale: {
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 25,
        },
    },
};

export const appearTextAnimation: MotionProps = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: [0, 0.7, 1, 1], scale: [0.8, 0.8, 1.05, 1] },
    transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.6, 1],
        times: [0, 0.1, 0.8, 1],
    },
};

export const appearTextLuckyPickAnimation = (variables) => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: [0, 0.7, 1, 1], scale: [0.8, 0.8, 1.05, 1] },
    transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.6, 1],
        times: [0, 0.1, 0.8, 1],
        delay: variables.delay * 0.3,
    },
});

export const bobbleAnimation: MotionProps = {
    initial: { scale: 1, y: -2 },
    animate: { scale: 1, y: -8 },
    transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
    },
};

export const burstSmallAnimation: MotionProps = {
    animate: { opacity: [0, 1, 1], scale: [0, 2, 1] },
    transition: {
        duration: 2,
        times: [0, 0.5, 1],
    },
};

export const burstLargeAnimation: MotionProps = {
    animate: { opacity: [0, 1, 1], scale: [0, 3, 1] },
    transition: {
        duration: 2,
        times: [0, 0.5, 1],
    },
};

export const disappearAnimation: MotionProps = {
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 0, scale: 0.5 },
    transition: {
        scale: {
            duration: 0.5,
        },
    },
};

export const jiggleAnimation: MotionProps = {
    initial: { opacity: 1, scale: 1 },
    animate: {
        scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
        scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
    },
    transition: {
        duration: 1,
        times: [0, 0.3, 0.4, 0.5, 0.65, 0.75, 1],
        ease: "easeInOut",
    },
};

// export const jiggleAnimation: Variants = {
//     jiggle: {
//       initial: { scale: 1 }, // initial is *outside* animate
//       transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
//       "0%": { scale: 1 },    // Keyframes are directly at the top level
//       "30%": { scale: 1.25 },
//       "40%": { scale: 0.75 },
//       "50%": { scale: 1.15 },
//       "65%": { scale: 0.95 },
//       "75%": { scale: 1.05 },
//       "100%": { scale: 1 },
//     },
//   };

export const pulseAnimation: MotionProps = {
    animate: { opacity: [1, 0.5, 1] },
    transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
    },
};

export const slideLeftAnimation: MotionProps = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: {
        type: "spring",
        ease: "easeIn",
        duration: 0.8,
    },
};

export const slideRightAnimation: MotionProps = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: {
        type: "spring",
        ease: "easeIn",
        duration: 0.8,
    },
};

export const slideRightTextAnimation: MotionProps = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: {
        type: "spring",
        ease: "easeIn",
        duration: 0.5,
        opacity: { duration: 0.2 },
    },
};

export const slideUpAnimation: MotionProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
        type: "spring",
        ease: "easeInOut",
        duration: 0.5,
        stiffness: 300,
        damping: 15,
        opacity: { duration: 0.2 },
    },
};
