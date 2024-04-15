import axiosInstance from "./utils/axiosInstance";
import type { Car } from "../_types/pages/garage/garage";

const addCar = async (
    car: Car
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