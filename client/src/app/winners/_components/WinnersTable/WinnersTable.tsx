import { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa6";

import styles from "../../../_styles/Winners/components/WinnersTable.module.scss";
import { getTableData } from "../../../_helpers/fetchDB";
import Pagination from "../../../_components/shared/Pagination/Pagination";

const WinnersTable = () => {
    const [winnersData, setWinnersData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        (async () => {
            let data = await getTableData("winners", currentPage);
            setWinnersData(data)
        })()
    }, [setWinnersData, currentPage])

    return (
        <div className={styles.winners_table_cont}>
            <table className={styles.winners_table_cont__table}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Car Name</th>
                        <th>Wins</th>
                        <th>Best Time</th>
                    </tr>
                </thead>
                <tbody>
                    {winnersData
                        // .concat(winnersData).concat(winnersData)
                        .map(({ id, wins, time }, index) => {
                            return (
                                <tr
                                    key={id}
                                    className={styles[`winners_table_cont__table__row_${index % 3 + 1}`]}>
                                    <td style={{
                                        position: currentPage === 1 && index < 3 ? 'relative' : 'static',
                                    }}>
                                        {currentPage === 1 && index < 3
                                            && <FaTrophy className={styles[`winners_table_cont__table__trophy_${index + 1}`]} />}
                                        {id || "N/n"}
                                    </td>
                                    <td>{"name" || "N/n"}</td>
                                    <td>{wins || "N/n"}</td>
                                    <td>{time || "N/n"}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
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

export default WinnersTable;