import axiosInstance from "./utils/axiosInstance";

const deleteCar = async (
   id: string
) => {
   return axiosInstance.delete(`/garage/${id}`)
      .then(({ data }) => data)
      .catch(({ message }) => {
         console.error(message || "Error occured");
      })
}

export default deleteCar;