import { motion } from "framer-motion";

import styles from "../../../_styles/Garage/components/GarageItems/components/GarageItem/components/Car/components/Fog.module.scss";
import { getAllVariants } from "./utils/functions";
import type { FogProps } from "../../../_types/garage";

const Fog = ({ show = true, fogStyles = {}, extraStyles = {} }: FogProps & any) => (
  <div
    className={styles.fogs}
    style={{
      ...extraStyles,
    }} >
    {show && getAllVariants().map((variants, index) => (
      <motion.div
        key={index}
        variants={variants}
        initial={"initial"}
        animate={"animate"}
        className={styles.fogs__fog}
        style={fogStyles}
      />
    ))}
  </div>
)

export default Fog;