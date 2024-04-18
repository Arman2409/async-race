import { motion } from "framer-motion";

import styles from "../../../../../_styles/components/shared/Loading/components/Wheel.module.scss";
import { carWheelVariants } from "./utils/variants";
import { getRectDegrees } from "./utils/functions";
import type { WheelProps } from "../../../../../_types/components/shared/loading/components/wheel";

const Wheel = ({ side }: WheelProps) => (
    <motion.div
        variants={carWheelVariants}
        initial="initial"
        animate="animate"
        className={side === "left" ? styles.wheel__forward : styles.wheel__backward}
    >
        {getRectDegrees().map((degrees: number) => (
            <div
                key={degrees}
                className={styles.wheel__rect}
                style={{
                    transform: `rotate(${degrees}deg)`
                }}
            />
        ))}
    </motion.div>
)

export default Wheel;