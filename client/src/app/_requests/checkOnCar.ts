import axiosInstance from "./utils/axiosInstance";

const checkOnCar = async (id: string) => {
    try {
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
    }  catch (err) {
        const {message = "Error occured while fetching"} = {...err || {}}
        console.error(message)
    }
}

export default checkOnCar;