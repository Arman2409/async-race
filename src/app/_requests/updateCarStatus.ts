import axiosInstance from "./utils/axiosInstance"
import { handleFetchError } from "./utils/functions";

const updateCarStatus = async (
    id: string, 
    status: string) => {
    try {
        return axiosInstance.patch("/engine", null, {
            params: {
                id,
                status
            }
        })
            .then(({ data }) => data)
            .catch(({ message }) => {
                console.error(message || "Error occured")
            });
    }
    catch (err) {
        return handleFetchError(err);
    }
}

export default updateCarStatus;