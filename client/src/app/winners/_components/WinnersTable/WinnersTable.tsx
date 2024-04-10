import { useCallback, useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa6";

import styles from "../../../_styles/Winners/components/WinnersTable.module.scss";
import getTableData from "../../../_requests/getTableData";
import getWinnerDetails from "../../../_requests/getWinnerDetails";
import CarIcon from "../../../_components/shared/CarIcon/CarIcon";

const WinnersTable = ({ currentPage, winnersData, setWinnersData }: {
    currentPage: number,
    winnersData: any[],
    setWinnersData: Function
}) => {

    const getWinners = useCallback((async () => {
        let data = await getTableData("winners", currentPage);
        data = await Promise.all(data.map(async (winner: any) => {
            if (!winner?.name || !winner?.color) {
                const winnerDetails = await getWinnerDetails(winner?.id);
                const { name = "...Deleted...", color = "" } = { ...winnerDetails || {} };
                return {
                    ...winner,
                    name,
                    color
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
                        <th>Car</th>
                        <th>Car Name</th>
                        <th>Wins</th>
                        <th>Best Time</th>
                    </tr>
                </thead>
                <tbody>
                    {winnersData.map(({ id, name, color, wins, time }, index) => (
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
                            <td><CarIcon color={color} /> </td>
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