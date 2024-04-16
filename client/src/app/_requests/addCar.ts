import axiosInstance from "./utils/axiosInstance";
import type { CarPayload } from "../_types/pages/garage/garage";

const addCar = async (
    car: CarPayload
) => {
    try {
        return axiosInstance.post(`/garage`, car)
        .then(({ data }) => data)
        .catch(({ message }) => {
            console.error(message || "Error occured");
        })
    }  catch (err) {
        const {message = "Error occured while fetching"} = {...err || {}}
        console.error(message)
    }
}

export default addCar;