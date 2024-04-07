"use client"
import { useRouter } from "next/navigation";
import styles from "../../_styles/Navigation/Navigation.module.scss";

const Navigation = ()  => {
    const router = useRouter();

    return (
        <div className={styles.navigation}>
           <button 
           onClick={() => router.push("/winners")}
           className={styles.navigation__button}>
             Winners
           </button>
           <button className={styles.navigation__button}>
             Garage
           </button>
        </div>
    )
}

export default Navigation;