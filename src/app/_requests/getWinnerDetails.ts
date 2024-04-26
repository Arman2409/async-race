
import axiosInstance from "./utils/axiosInstance";
import { handleFetchError } from "./utils/functions";

const getWinnerDetails = async (
   id: string
) => {
   try {
      const response = await axiosInstance.get(`/garage/${id}`);
      return response.data;
   } catch (err) {
      return handleFetchError(err);
   }
};

export default getWinnerDetails;