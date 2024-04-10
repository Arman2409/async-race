import axiosInstance from "./utils/axiosInstance";

const addCar = async (
    car: any
) => {
    return axiosInstance.post(`/garage`, car)
        .then(({ data }) => data)
        .catch(({ message }) => {
            console.error(message || "Error occured");
        })
}

export default addCar;