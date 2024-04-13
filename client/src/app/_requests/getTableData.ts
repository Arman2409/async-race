import { GARAGE_PER_PAGE } from "../_configs/garage";
import { WINNERS_PER_PAGE } from "../_configs/winners";
import axiosInstance from "./utils/axiosInstance";

const getTableData = async (
    forTable: "winners" | "garage",
    page: number = 1
) => {
    const params = forTable === "garage" ? {
        _page: page,
        _limit: GARAGE_PER_PAGE
    } : {
        _page: page,
        _limit: WINNERS_PER_PAGE,
        _sort: 'time',
        _order: 'desc',
    }
    return axiosInstance.get(`/${forTable}`, {
        params
    }).then(({ data }) => data)
      .catch(({ message }) => {
            console.error(message || "Error occured");
      })
}

export default getTableData;