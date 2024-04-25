"use client"
import { useContext, useState } from "react";

import styles from "../_styles/pages/Winners/Winners.module.scss";
import { WINNER_PER_PAGE } from "../_configs/winners";
import WinnersTable from "./_components/WinnersTable/WinnersTable";
import Pagination from "../_components/shared/Pagination/Pagination";
import { paginationContext } from "../_context/pagination/context";
import type { Winner } from "../_types/pages/winners/winner";

const Winner = () => {
    const [winnersData, setWinnersData] = useState<Winner[]>([]);
    const [total, setTotal] = useState<number>(0);

    const { winnerPage } = useContext(paginationContext);
    const [currentPage, setCurrentPage] = useState<number>(winnerPage || 1);
 
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
                type="winner"
                itemsCount={winnersData.length}
                perPage={WINNER_PER_PAGE}
            />
        </div>
    )
}

export default Winner;