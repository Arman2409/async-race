import axiosInstance from "./utils/axiosInstance";

const getWinnerDetails = async (
    id: string
 ) => {
    return axiosInstance.get(`/garage/${id}`)
    .then(({ data }) => data)
    .catch(({ message }) => {
       console.error(message || "Error occured");
    })
 }

 export default getWinnerDetails;