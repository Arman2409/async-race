"use client"
import { useEffect, useState } from "react";

import styles from "../../_styles/Header/Header.module.scss";
import { WINDOW_LOAD_DELAY } from "../../_configs/global";
import GlobalLoading from "./components/GlobalLoading/GlobalLoading";
import Lights from "./components/Lights/Lights";

const Header = () => {
    const [showGlobalLoading, setShowGlobalLoading] = useState<boolean>(true);

    useEffect(() => {
      window.onload = () => {
        setTimeout(() => {
          setShowGlobalLoading(false);
        }, WINDOW_LOAD_DELAY * 1000)
      }
    }, [setShowGlobalLoading, window])

    return (
    <div
        className={styles.header}>
        <GlobalLoading show={showGlobalLoading} />
        <Lights key="left" />
        <img
            className={styles.header__logo}
            src="./logo.png" />
        <Lights key="right" />
    </div>
)}

export default Header;