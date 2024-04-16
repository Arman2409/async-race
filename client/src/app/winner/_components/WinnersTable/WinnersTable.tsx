import { useCallback, useEffect, useState, } from "react";
import { FaChevronUp, FaTrophy} from "react-icons/fa6";

import styles from "../../../_styles/pages/Winner/components/WinnersTable.module.scss";
import getTableData from "../../../_requests/getTableData";
import getWinnerDetails from "../../../_requests/getWinnerDetails";
import CarIcon from "../../../_components/shared/CarIcon/CarIcon";
import Loading from "../../../_components/shared/Loading/Loading";
import type { Winner, WinnersTableProps } from "../../../_types/pages/winners/winner";

const WinnersTable = ({ currentPage, winnersData, setWinnersData }: WinnersTableProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [sortByWins, setSortByWins] = useState<"desc" | "asc" | "default">("default");
    const [sortByTime, setSortByTime] = useState<"desc" | "asc" | "default">("default");

    const getWinners = useCallback((async () => {
        setLoading(true);
        let data = await getTableData("winners", currentPage, sortByWins, sortByTime,);
        data = await Promise.all(data.flatMap(async (winner: Winner) => {
            if (!winner?.name || !winner?.color) {
                const winnerDetails = await getWinnerDetails(winner?.id);
                const { name = "", color = "" } = { ...winnerDetails || {} };
                if (!name) return [];
                return {
                    ...winner,
                    name,
                    color
                }
            }
            return winner;
        }))
        data = data.flatMap((e: Winner) => e);
        setWinnersData(data);
        setLoading(false);
    }), [setWinnersData, currentPage, setLoading, sortByTime, sortByWins])

    const changeSortDetails = useCallback((column: "wins" | "time") => {
        if (column === "wins") {
            setSortByWins(curr => {
                switch (curr) {
                    case ("desc"): return "asc";
                    case ("asc"): return "desc";
                    case ("default"): return "asc";
                }
            });
            setSortByTime("default")
        }
        if (column === "time") {
            setSortByTime(curr => {
                switch (curr) {
                    case ("desc"): return "asc";
                    case ("asc"): return "desc";
                    case ("default"): return "desc";
                }
            });
            setSortByWins("default")
        }
        getWinners();
    }, [setSortByTime, setSortByWins, getWinners])

    useEffect(() => {
        getWinners();
    }, [getWinners, currentPage])

    return (
        <div className={styles.winners_table_cont}>
            <Loading
                show={loading}
                zIndex={9}
            />
            <table className={styles.winners_table_cont__table}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Car</th>
                        <th>Car Name </th>
                        <th
                            onClick={() => changeSortDetails("wins")}>
                            Wins
                            <FaChevronUp
                                style={{ transform: `rotate(${sortByWins === "desc" ? 180 : 0}deg)` }}
                            />
                        </th>
                        <th
                            onClick={() => changeSortDetails("time")}>
                            Best Time
                            <FaChevronUp
                                style={{ transform: `rotate(${sortByTime === "desc" ? 180 : 0}deg)` }}
                            />
                        </th>
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