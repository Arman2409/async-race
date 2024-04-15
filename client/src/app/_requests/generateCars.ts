import axiosInstance from "./utils/axiosInstance";
import type { Car } from "../_types/pages/garage/garage";

const generateCars = async (cars: Car[]) => {
    try {
        let addStatus = true;
        cars.forEach(async car => {
            const addResult = await axiosInstance.post(`/garage`, car)
                .catch(() => null);
            if (!addResult) addStatus = false;
        })
        return addStatus;
    } catch (err) {
        const { message = "Error occured while fetching" } = { ...err || {} }
        console.error(message)
    }
}

export default generateCars;