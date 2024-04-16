import axiosInstance from "./utils/axiosInstance"
import type { Car } from "../_types/pages/garage/garage";

const editCar = async ({ id, ...rest }: Car) => {
    try {
        return axiosInstance.patch(`/garage/${id}`, rest)
            .then(({ data }) => data)
            .catch(({ message }) => {
                console.error(message || "Error occured");
            })
    } catch (err) {
        const { message = "Error occured while fetching" } = { ...err || {} }
        console.error(message)
    }
}

export default editCar;