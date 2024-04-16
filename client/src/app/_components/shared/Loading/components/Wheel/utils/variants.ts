import type { Variants } from "framer-motion";

export const carWheelVariants:Variants = {
    initial: {
        transform: "rotate(15deg)"
    },
    animate: {
        transform: "rotate(360deg)",
        transition: {
            ease: "linear",
            duration: 0.5,
            repeat: Infinity
        }
    }
};