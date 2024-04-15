import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

import styles from "../../../../../../../_styles/Garage/components/GarageItems/components/GarageItem/components/Car/Car.module.scss";
import CarIcon from "../../../../../../../_components/shared/CarIcon/CarIcon";
import Fog from "../../../../../../../_components/shared/Fog/Fog";
import type { CarProps } from "../../../../../../../_types/pages/garage/garage";

const Car = ({
    color,
    driveDetails,
    highwayWidth,
    status,
    finishRace,
    setStatus}: CarProps) => {
    const controls = useAnimationControls()

    useEffect(() => {
        if (status === "started") {
            const { velocity = 0, distance = 1000 } = { ...driveDetails };
            if (!velocity) {
                controls.stop();
                return;
            }
            const animationDistance = highwayWidth - 115;
            const duration = highwayWidth / velocity;
            controls.start({ x: animationDistance, transition: { duration } })
                .then(() => finishRace());
        }

    }, [controls, driveDetails, highwayWidth, setStatus, status])

    useEffect(() => {
        if (status === "initial" || status === "waiting") {
            controls.start({ x: 0 }, { duration: 0 });
        }
        if (status === "broken") {
            controls.stop();
        }
    }, [status, controls])

    return (
        <motion.div
            animate={controls}
            className={styles.car}>
            <Fog
                show={status === "started" || status === "broken" ||  status === "waiting"}
                isBroken={status === "broken"}
            />
            <CarIcon
                color={color}
                lightsColor={status === "started" || status === "waiting" ? "yellow" : "gray"} />
            <div
                className={styles.car__lights}
                style={{
                    opacity: status === "started" || status === "waiting" ? 1 : 0
                }} />
        </motion.div>
    )
}

export default Car;