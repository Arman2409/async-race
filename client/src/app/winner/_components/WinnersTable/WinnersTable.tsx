import { useCallback, useEffect, useState, } from "react";
import { FaChevronUp } from "react-icons/fa6";

import styles from "../../../_styles/pages/Winner/components/WinnersTable/WinnersTable.module.scss";
import { COLOR_INPUT_DEFAULT_COLOR } from "../../../_configs/garage";
import getTableData from "../../../_requests/getTableData";
import getWinnerDetails from "../../../_requests/getWinnerDetails";
import Loading from "../../../_components/shared/Loading/Loading";
import WinnersTableBody from "./components/WinnersTableBody/WinnersTableBody";
import type { Winner, WinnersTableProps } from "../../../_types/pages/winners/winner";

const WinnersTable = ({ currentPage, setTotal, winners, setWinnersData }: WinnersTableProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [sortByWins, setSortByWins] = useState<"desc" | "asc" | "default">("default");
    const [sortByTime, setSortByTime] = useState<"desc" | "asc" | "default">("default");

    const getWinners = useCallback((async () => {
        setLoading(true);
        const { data = [], total = 0 } = await getTableData("winners", currentPage, sortByWins, sortByTime);
        setTotal(total);
        const winnerDetailsPromises = await Promise.all(data.flatMap(async (winner: Winner) => {
            if (!winner?.name || !winner?.color) {
                const winnerDetails = await getWinnerDetails(winner?.id);
                const { name = "", color = "" } = { ...winnerDetails || {} };
                return {
                    ...winner,
                    name: name || "...Car deleted...",
                    color: COLOR_INPUT_DEFAULT_COLOR
                }
            }
            return winner;
        }))
        setWinnersData(winnerDetailsPromises);
        setLoading(false);
    }), [currentPage, setWinnersData, setTotal, setLoading, sortByTime, sortByWins])

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
                    case ("default"): return "asc";
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
                                className={styles.winners_table_cont__sort_icon}
                                style={{ transform: `rotate(${(sortByWins === "desc" || sortByWins === "default") ? 180 : 0}deg)` }}
                            />
                        </th>
                        <th
                            onClick={() => changeSortDetails("time")}>
                            Best Time
                            <FaChevronUp
                                className={styles.winners_table_cont__sort_icon}
                                style={{ transform: `rotate(${(sortByTime === "desc" || sortByTime === "default") ? 180 : 0}deg)` }}
                            />
                        </th>
                    </tr>
                </thead>
                <WinnersTableBody
                  currentPage={currentPage} 
                  winners={winners}/>
            </table>
        </div>
    )
}

export default WinnersTable;