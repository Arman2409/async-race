import axiosInstance from "./utils/axiosInstance";
import type { CarPayload } from "../_types/pages/garage";
import { handleFetchError } from "./utils/functions";

const addCar = async (
    car: CarPayload
) => {
    try {
        const response = await axiosInstance.post(`/garage`, car);
        return response.data;
    } catch (err) {
       return handleFetchError(err);
    }
};

export default addCar;