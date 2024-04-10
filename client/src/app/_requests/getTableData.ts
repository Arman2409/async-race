import axiosInstance from "./utils/axiosInstance";

const getTableData = async (
    forTable: "winners" | "garage",
    page: number = 1
) => {
    const params = forTable === "garage" ? {
        _page: page,
        _limit: 8
    } : {
        _page: page,
        _limit: 8,
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