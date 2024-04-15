import { motion } from "framer-motion";

import styles from "../../../_styles/Garage/components/GarageItems/components/GarageItem/components/Car/components/Fog.module.scss";
import { getAllVariants } from "./utils/functions";
import type { FogProps } from "../../../_types/pages/garage/garage";

const Fog = ({ show = true, isBroken = false }: FogProps) => (
  <div
    className={styles.fogs}
    style={{
      left: isBroken ? "50px" : "unset",
    }} >
    {show && getAllVariants().map((variants, index) => (
      <motion.div
        key={index}
        variants={variants}
        initial={"initial"}
        animate={"animate"}
        className={styles.fogs__fog}
        style={{
          backgroundColor: isBroken ? "black" : "grey"
        }}
      />
    ))}
  </div>
)

export default Fog;