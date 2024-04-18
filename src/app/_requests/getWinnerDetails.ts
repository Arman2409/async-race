import axiosInstance from "./utils/axiosInstance";

const getWinnerDetails = async (
   id: string
) => {
   try {
      return axiosInstance.get(`/garage/${id}`)
         .then(({ data }) => data)
         .catch(({ message }) => {
            console.error(message || "Error occured");
         })
   }
   catch (err) {
      const { message = "Error occured while fetching" } = { ...err || {} }
      console.error(message)
   }
}

export default getWinnerDetails;