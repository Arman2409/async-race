import axiosInstance from "./utils/axiosInstance";
import { handleFetchError } from "./utils/functions";

const deleteCar = async (
   id: string
) => {
   try {
      const deleteResult = await axiosInstance.delete(`/garage/${id}`);
      axiosInstance.delete(`/winner/${id}`).catch(() => {});
      if (deleteResult) return true;
   } catch (err) {
      return handleFetchError(err);
   }
}

export default deleteCar;