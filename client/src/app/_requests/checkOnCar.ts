import axiosInstance from "./utils/axiosInstance";

const checkOnCar = async (id: string) => {
    return axiosInstance.patch("/engine", null, {
        params: {
            id,
            status: "drive"
        }
    })
        .then(({ data }) => data)
        .catch(({ message }) => {
            console.error(message || "Error occured")
        })
}

export default checkOnCar;