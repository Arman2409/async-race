import { useCallback, useEffect, useState, } from "react";
import { FaChevronUp } from "react-icons/fa6";

import styles from "../../../_styles/pages/Winner/components/WinnerTable/WinnerTable.module.scss";
import { COLOR_INPUT_DEFAULT_COLOR } from "../../../_configs/garage";
import getTableData from "../../../_requests/getTableData";
import getWinnerDetails from "../../../_requests/getWinnerDetails";
import Loading from "../../../_components/shared/Loading/Loading";
import WinnerTableBody from "./components/WinnerTableBody/WinnerTableBody";
import type { SortStatus, Winner, WinnerTableProps } from "../../../_types/pages/winner";

const WinnerTable = ({
    currentPage,
    winner,
    setTotal,
    setwinnerData }: WinnerTableProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [sortByWins, setSortByWins] = useState<SortStatus>("default");
    const [sortByTime, setSortByTime] = useState<SortStatus>("default");

    const getwinner = useCallback((async () => {
        setLoading(true);
        const { data = [], total = 0 } = await getTableData("winner", currentPage, sortByWins, sortByTime);
        setTotal(total);
        const winnerDetailsPromises = await Promise.all(data.flatMap(async (winner: Winner) => {
            if (!winner?.name || !winner?.color) {
                const winnerDetails = await getWinnerDetails(winner?.id);
                console.log(winnerDetails);
                
                const { name = "", color = "" } = { ...winnerDetails || {} };
                return {
                    ...winner,
                    name: name || "...Car deleted...",
                    color: color || COLOR_INPUT_DEFAULT_COLOR
                }
            }
            return winner;
        }))
        setwinnerData(winnerDetailsPromises);
        setLoading(false);
    }), [currentPage, setwinnerData, setTotal, setLoading, sortByTime, sortByWins])

    const changeSortDetails = useCallback((column: "wins" | "time") => {
        if (column === "wins") {
            setSortByWins((curr) => {
                if (curr === "desc") return "asc";
                if (curr === "asc") return "desc";
                return "asc"; // "default" case
            });
            setSortByTime("default");
        } else if (column === "time") {
            setSortByTime((curr) => {
                if (curr === "desc") return "asc";
                if (curr === "asc") return "desc";
                return "asc"; // "default" case
            });
            setSortByWins("default");
        }
        getwinner();
    }, [setSortByTime, setSortByWins, getwinner]);

    useEffect(() => {
        getwinner();
    }, [getwinner])

    return (
        <div className={styles.winner_table_cont}>
            <Loading
                show={loading}
                zIndex={9}
            />
            <table className={styles.winner_table_cont__table}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Car</th>
                        <th>Car Name </th>
                        <th
                            onClick={() => changeSortDetails("wins")}>
                            Wins
                            <FaChevronUp
                                className={styles.winner_table_cont__sort_icon}
                                style={{ transform: `rotate(${(sortByWins === "desc" || sortByWins === "default") ? 180 : 0}deg)` }}
                            />
                        </th>
                        <th
                            onClick={() => changeSortDetails("time")}>
                            Best Time
                            <FaChevronUp
                                className={styles.winner_table_cont__sort_icon}
                                style={{ transform: `rotate(${(sortByTime === "desc" || sortByTime === "default") ? 180 : 0}deg)` }}
                            />
                        </th>
                    </tr>
                </thead>
                <WinnerTableBody
                    currentPage={currentPage}
                    winner={winner} />
            </table>
        </div>
    )
}

export default WinnerTable;