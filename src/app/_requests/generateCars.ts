import axiosInstance from "./utils/axiosInstance";
import type { CarPayload } from "../_types/pages/garage";
import { handleFetchError } from "./utils/functions";

const generateCars = async (cars: CarPayload[]) => {
    try {
        const addResults = await Promise.all(
            cars.map(async (car) => axiosInstance.post(`/garage`, car))
        );
        if (addResults.some((result) => !result)) {
            return false; // Some car addition failed
        }
        return true; // All car additions successful
    } catch (err) {
        return handleFetchError(err);
    }
};

export default generateCars;