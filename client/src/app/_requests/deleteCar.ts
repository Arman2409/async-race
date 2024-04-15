import axiosInstance from "./utils/axiosInstance";

const deleteCar = async (
   id: string
) => {
   try {
      return axiosInstance.delete(`/garage/${id}`)
         .then(({ data }) => data)
         .catch(({ message }) => {
            console.error(message || "Error occured");
         })
   } catch (err) {
      const { message = "Error occured while fetching" } = { ...err || {} }
      console.error(message)
   }
}

export default deleteCar;