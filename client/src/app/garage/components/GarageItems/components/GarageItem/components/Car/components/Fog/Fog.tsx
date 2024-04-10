import { motion } from "framer-motion";

import styles from "../../../../../../../../../_styles/Garage/components/GarageItems/components/GarageItem/components/Car/components/Fog.module.scss";
import { getAllVariants } from "./utils/functions";
import type { FogProps } from "../../../../../../../../../_types/garage";

const Fog = ({ zIndex, show, extraStyles }: FogProps & any) => {
  const fogVariants = getAllVariants();

  return (
    <div
      className={styles.fogs}
      style={{
        ...extraStyles || {},
        zIndex,
      }} >
      {show && fogVariants.map((variants, index) => (
        <motion.div
          key={index}
          variants={variants}
          initial={"initial"}
          animate={"animate"}
          className={styles.fogs__fog}
        />
      ))}
    </div>
  )
}

export default Fog;