import axiosInstance from "./utils/axiosInstance"

const updateCarStatus = async (id: string, status: string) => {
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

export default updateCarStatus;