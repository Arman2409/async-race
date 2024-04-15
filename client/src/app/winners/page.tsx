"use client"
import { useState } from "react";

import styles from "../_styles/Winners/Winners.module.scss";
import WinnersTable from "./_components/WinnersTable/WinnersTable";
import Pagination from "../_components/shared/Pagination/Pagination";
import type { Winner } from "../_types/pages/winners/winner";

const Winner = () => {
    const [winnersData, setWinnersData] = useState<Winner[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    return (
        <div className={styles.winner}>
            <WinnersTable
                currentPage={currentPage}
                winnersData={winnersData}
                setWinnersData={setWinnersData} />
            <Pagination
                current={currentPage}
                setCurrent={setCurrentPage}
                opacity={0.85}
                itemsCount={winnersData.length}
                perPage={8}
            />
        </div>
    )
}

export default Winner;