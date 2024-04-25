import axiosInstance from "./utils/axiosInstance";
import { handleFetchError } from "./utils/functions";

const deleteCar = async (
   id: string
) => {
   try {
      await axiosInstance.delete(`/garage/${id}`);
      await axiosInstance.delete(`/winner/${id}`);
      return true;
   } catch (err) {
      return handleFetchError(err);
   }
}

export default deleteCar;