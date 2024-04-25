import { GARAGE_PER_PAGE } from "../_configs/garage";
import { WINNER_PER_PAGE } from "../_configs/winner";
import axiosInstance from "./utils/axiosInstance";
import { handleFetchError } from "./utils/functions";

const getTableData = async (
    forTable: "winner" | "garage",
    page: number = 1,
    sortByWins?: "desc" | "asc" | "default",
    sortByTime?: "desc" | "asc" | "default"
) => {
    const sort = sortByWins !== "default" ? "wins" : "time";
    const order = sortByWins !== "default" ? sortByWins
        : sortByTime !== "default" ? sortByTime : "inc";
    const params = forTable === "garage"
        ? { _page: page, _limit: GARAGE_PER_PAGE }
        : { _page: page, _limit: WINNER_PER_PAGE, _sort: sort, _order: order };

    try {
        const response = await axiosInstance.get(`/${forTable}`, { params });
        return {
            data: response.data || [],
            total: response.headers["x-total-count"] || 0,
        };
    } catch (err) {
        handleFetchError(err);
        return {
            data: [],
            total: 0,
        };
    }
};

export default getTableData;