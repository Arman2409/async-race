"use client"
import { useEffect, useState } from "react";

import styles from "../../_styles/Header/Header.module.scss";
import { WINDOW_LOAD_DELAY } from "../../_configs/global";
import Loading from "../shared/Loading/Loading";
import Lights from "./components/Lights/Lights";

const Header = () => {
  const [showLoading, setShowLoading] = useState<boolean>(true);

  useEffect(() => {
    window.onload = () => {
      setTimeout(() => {
        setShowLoading(false);
      }, WINDOW_LOAD_DELAY * 1000)
    }
  }, [setShowLoading, window])

  return (
    <div
      className={styles.header}>
      <Loading
        zIndex={10}
        show={showLoading} />
      <Lights key="left" />
      <img
        className={styles.header__logo}
        src="./logo.png" />
      <Lights key="right" />
    </div>
  )
}

export default Header;