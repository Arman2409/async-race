"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "../../_styles/components/Header/Header.module.scss";
import { WINDOW_LOAD_DELAY } from "../../_configs/global";
import Loading from "../shared/Loading/Loading";
import Lights from "./components/Lights/Lights";

const Header = () => {
  const [showLoading, setShowLoading] = useState<boolean>(true);

  useEffect(() => {
      window.onload = () => {
        setTimeout(() => setShowLoading(false), WINDOW_LOAD_DELAY * 1000)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setShowLoading, window])

  return (
    <div
      className={styles.header}>
      <Loading
        zIndex={10}
        show={showLoading} />
      <Lights
        key="left"
        position={"left"} />
      <Image
        alt="Async Race"
        width={parseInt(styles.logo_width, 10)}
        height={parseInt(styles.header_height, 10)}
        className={styles.header__logo}
        src="/logo.png" />
      <Lights
        key="right"
        position={"right"} />
    </div>
  )
}

export default Header;