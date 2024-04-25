"use client"
import { useContext, useState } from "react";

import styles from "../_styles/pages/Winner/Winner.module.scss";
import { WINNER_PER_PAGE } from "../_configs/winner";
import { paginationContext } from "../_context/pagination/context";
import WinnerTable from "./_components/WinnerTable/WinnerTable";
import Pagination from "../_components/shared/Pagination/Pagination";
import type { Winner } from "../_types/pages/winner";

const Winner = () => {
    const [winnerData, setwinnerData] = useState<Winner[]>([]);
    const [total, setTotal] = useState<number>(0);

    const { winnerPage } = useContext(paginationContext);
    const [currentPage, setCurrentPage] = useState<number>(winnerPage || 1);
 
    return (
        <div className={styles.winner}>
            <WinnerTable
                currentPage={currentPage}
                winner={winnerData}
                setTotal={setTotal}
                setwinnerData={setwinnerData} />
            <Pagination
                current={currentPage}
                setCurrent={setCurrentPage}
                opacity={0.85}
                total={total}
                type="winner"
                itemsCount={winnerData.length}
                perPage={WINNER_PER_PAGE}
            />
        </div>
    )
}

export default Winner;