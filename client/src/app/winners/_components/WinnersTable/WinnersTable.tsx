import { useCallback, useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa6";

import styles from "../../../_styles/Winners/components/WinnersTable.module.scss";
import { getTableData, getWinnerName } from "../../../_helpers/fetchDB";

const WinnersTable = ({currentPage, winnersData, setWinnersData}:{
    currentPage: number,
    winnersData: any[],
    setWinnersData: Function
}) => {
    
    const getWinners = useCallback((async () => {
        let data = await getTableData("winners", currentPage);
        data = await Promise.all(data.map(async (winner: any) => {
            if (!winner?.name) {
                const winnerName = await getWinnerName(winner?.id);
                console.log({ winnerName })
                return {
                    ...winner,
                    name: winnerName
                }
            }
            return winner;
        }))
        setWinnersData(data)
    }), [setWinnersData, currentPage])

    useEffect(() => {
        getWinners();
    }, [getWinners, currentPage])

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
                    {winnersData.map(({ id, name, wins, time }, index) => (
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
                            <td>{name || "N/n"}</td>
                            <td>{wins || "N/n"}</td>
                            <td>{time || "N/n"}</td>
                        </tr>)
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default WinnersTable;