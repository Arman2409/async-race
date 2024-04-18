"use client"
import { useState } from "react";

import styles from "../_styles/pages/Winner/Winner.module.scss";
import { WINNER_PER_PAGE } from "../_configs/winners";
import WinnersTable from "./_components/WinnersTable/WinnersTable";
import Pagination from "../_components/shared/Pagination/Pagination";
import type { Winner } from "../_types/pages/winners/winner";

const Winner = () => {
    const [winnersData, setWinnersData] = useState<Winner[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    return (
        <div className={styles.winner}>
            <WinnersTable
                currentPage={currentPage}
                winners={winnersData}
                setTotal={setTotal}
                setWinnersData={setWinnersData} />
            <Pagination
                current={currentPage}
                setCurrent={setCurrentPage}
                opacity={0.85}
                total={total}
                itemsCount={winnersData.length}
                perPage={WINNER_PER_PAGE}
            />
        </div>
    )
}

export default Winner;