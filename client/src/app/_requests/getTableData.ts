import { GARAGE_PER_PAGE } from "../_configs/garage";
import { WINNER_PER_PAGE } from "../_configs/winners";
import axiosInstance from "./utils/axiosInstance";

const getTableData = async (
    forTable: "winners" | "garage",
    page: number = 1,
    sortByWins?: "desc" | "asc" | "default",
    sortByTime?: "desc" | "asc" | "default"
) => {
    const sort = sortByWins !== "default" ? "wins" : "time";
    const order = sortByWins !== "default" ? sortByWins
        : sortByTime !== "default" ? sortByTime : "inc";
    const params = forTable === "garage" ? {
        _page: page,
        _limit: GARAGE_PER_PAGE
    } : {
        _page: page,
        _limit: WINNER_PER_PAGE,
        _sort: sort,
        _order: order,
    }
    try {
        return axiosInstance.get(`/${forTable}`, {
            params
        }).then(({ data, headers }) => {
            return {
                data: data || [],
                total: headers["x-total-count"] || 0,
            }
        })
    } catch (err) {
        const { message = "Error occured while fetching" } = { ...err || {} }
        console.error(message)
        return {
            data: [],
            total: []
        }
    }
}

export default getTableData;