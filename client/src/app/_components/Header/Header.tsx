"use client"
import styles from "../../_styles/Header/Header.module.scss";
import Lights from "./components/Lights/Lights";

const Header = () => (
    <div
        className={styles.header}>
        <Lights key="left-lights" />
        <img
            className={styles.header__logo}
            src="./logo.png" />
        <Lights key="right-lights" lightsTop={true} />
    </div>
)

export default Header;