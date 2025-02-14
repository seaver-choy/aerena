import { useState } from "react";
import { motion, useMotionValue } from "motion/react";
import { appearAnimation } from "../../helpers/animation";

import Sample from "../../assets/card/sample.svg";

const images = [Sample, Sample];
const buffer = 30;
const transition = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

export const Slider = () => {
    const [imageIndex, setImageIndex] = useState(0);

    const dragX = useMotionValue(0);

    const onDragEnd = () => {
        const x = dragX.get();

        if (x <= -buffer && imageIndex < images.length - 1) {
            setImageIndex((pv) => pv + 1);
        } else if (x >= buffer && imageIndex > 0) {
            setImageIndex((pv) => pv - 1);
        }
    };

    return (
        <motion.div
            className="relative flex h-full w-full justify-center overflow-hidden"
            {...appearAnimation}
        >
            <motion.div
                className="flex w-[60%] items-center"
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0,
                }}
                style={{ x: dragX }}
                animate={{ translateX: `-${imageIndex * 100}%` }}
                transition={transition}
                onDragEnd={onDragEnd}
            >
                {images.map((imageSource, index) => (
                    <motion.div
                        key={index}
                        className="flex w-full shrink-0 justify-center"
                        animate={{
                            scale: imageIndex === index ? 0.95 : 0.8,
                            opacity: imageIndex === index ? 1 : 0.5,
                        }}
                        transition={transition}
                    >
                        <img
                            className="w-full"
                            src={imageSource}
                            draggable={false}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};
