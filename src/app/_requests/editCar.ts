import axiosInstance from "./utils/axiosInstance";
import { handleFetchError } from "./utils/functions";
import type { Car } from "../_types/pages/garage";

const editCar = async ({ id, ...rest }: Car) => {
    try {
        const response = await axiosInstance.patch(`/garage/${id}`, rest);
        return response.data;
    } catch (err) {
        return handleFetchError(err);
    }
};

export default editCar;