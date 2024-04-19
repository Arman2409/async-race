import axiosInstance from "./utils/axiosInstance";
import type { Winner } from "../_types/pages/winners/winner";

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
      const response = await axiosInstance.get("/winners");
      
      if (response) {
         const itemsToDelete = response?.data?.filter(({ id: winnerId }: Winner) => winnerId === id);
         for (const {id: itemId} of itemsToDelete) {
            await axiosInstance.delete(`/winners/${itemId}`);
         }
         return true;
      }
      return false;
   } catch (err) {
      const { message = "Error occured while fetching" } = { ...err || {} }
      console.error(message)
   }
}

export default deleteCar;