"use client"
import styles from "../_styles/Winners/Winners.module.scss";
import WinnersTable from "./_components/WinnersTable/WinnersTable";

const Winners = () => {
    return (
        <div className={styles.winners}>
            <h2 className={styles.winners__title}>
                Winners
            </h2>
            <WinnersTable />
        </div>
    )
}

export default Winners;