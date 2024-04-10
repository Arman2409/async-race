import styles from "../../../../../../../_styles/Garage/components/GarageItems/components/GarageItem/components/Car/Car.module.scss";
import CarIcon from "../../../../../../../_components/shared/CarIcon/CarIcon";
import Fog from "./components/Fog/Fog";
import type { CarProps } from "../../../../../../../_types/garage";

const Car = ({ started, color }: CarProps) => (
    <div className={styles.car}>
        <Fog show={started} zIndex={5} />
        <CarIcon
            color={color}
            lightsColor={started ? "yellow" : "gray"} />
        {started && <div className={styles.car__lights} />}
    </div>
)

export default Car;