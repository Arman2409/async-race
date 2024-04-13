import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

import styles from "../../../../../../../_styles/Garage/components/GarageItems/components/GarageItem/components/Car/Car.module.scss";
import CarIcon from "../../../../../../../_components/shared/CarIcon/CarIcon";
import Fog from "../../../../../../../_components/shared/Fog/Fog";
import type { CarProps } from "../../../../../../../_types/garage";

const Car = ({
    color,
    driveDetails,
    highwayWidth,
    status,
    finishRace,
    setStatus }: CarProps & any) => {
    const carCont = useRef<any>();
    const controls = useAnimationControls()

    useEffect(() => {
        const { velocity = 0, distance = 1000 } = { ...driveDetails };
        if (!velocity) {
            controls.stop();
            return;
        }
        const animationDistance = highwayWidth - 115;
        const duration = highwayWidth / velocity;
        controls.start({ x: animationDistance, transition: { duration } })
        .then((d) => finishRace());
    }, [controls, driveDetails, highwayWidth, setStatus])

    useEffect(() => {
        if (status === "initial") {
            controls.start({x: 0}, {duration: 0});
        }
        if (status === "broken") {
            controls.stop();
        }
    }, [status, controls])

    return (
        <motion.div
            animate={controls}
            ref={carCont}
            className={styles.car}>
            <Fog 
              show={status === "started" || status === "broken"}
              extraStyles={{
                 left: status === "broken"  ? "50px" : "unset",
              }}
              fogStyles={{
                backgroundColor: status === "broken"  ? "black" : "grey",
              }}
             />
            <CarIcon
                color={color}
                lightsColor={status === "started" ? "yellow" : "gray"} />
            <div
                className={styles.car__lights}
                style={{
                    opacity: status === "started" ? 1 : 0
                }} />
        </motion.div>
    )
}

export default Car;