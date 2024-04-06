import styles from "../../_styles/Navigation/Navigation.module.scss";

const Navigation = ()  => {
    return (
        <div className={styles.navigation}>
           <button className={styles.navigation__button}>
             Winners
           </button>
           <button className={styles.navigation__button}>
             Garage
           </button>
        </div>
    )
}

export default Navigation;