import axios from "axios";

export const getTableData = async (
   forTable: "winners" | "garage",
   page: number = 1
) => {
   return axios.get(`http://localhost:4000/${forTable}`, {
      params: {
         _page: page,
         _sort: 'time',
         _order: 'desc',
         _per_page: 8
      }
   }).then(({ data }) => {
      return data;
   }).catch(({ message }) => {
      console.error(message || "Error occured");
   })
}


export const getWinnerName = async (
   id: string
) => {
   return axios.get(`http://localhost:4000/garage/${id}`).then(({ data }) => {
      return data?.name;
   }).catch(({ message }) => {
      console.error(message || "Error occured");
   })
}

export const deleteGarageItem = async (
   id: string
) => {
   return axios.delete(`http://localhost:4000/garage/${id}`).then(({ data }) => {
      return data;
   }).catch(({ message }) => {
      console.error(message || "Error occured");
   })
}