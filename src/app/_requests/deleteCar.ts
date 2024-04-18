import axiosInstance from "./utils/axiosInstance";

const deleteCar = async (
   id: string
) => {
   try {
      const deleteCarResult = await axiosInstance.delete(`/garage/${id}`)
         .then(() => true)
         .catch(({ message }) => {
            console.error(message || "Error occured");
            return false;
         })
      axiosInstance.delete(`/winners/${id}`)
         .then(() => true)
         .catch(() => false)
      return deleteCarResult;
   } catch (err) {
      const { message = "Error occured while fetching" } = { ...err || {} }
      console.error(message)
   }
}

export default deleteCar;