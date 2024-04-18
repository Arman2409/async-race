import axiosInstance from "./utils/axiosInstance"

const updateCarStatus = async (
    id: string, 
    status: string) => {
    try {
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
    catch (err) {
        const { message = "Error occured while fetching" } = { ...err || {} }
        console.error(message)
    }
}

export default updateCarStatus;