"use client"
import styles from "../../_styles/Header/Header.module.scss";
import Lights from "./components/Lights/Lights";

const Header = () => (
    <div
        className={styles.header}>
        <Lights key="left" />
        <img
            className={styles.header__logo}
            src="./logo.png" />
        <Lights key="right" />
    </div>
)

export default Header;