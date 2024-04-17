import axiosInstance from "./utils/axiosInstance";

const checkOnCar = async (id: string) => {
    try {
        return await axiosInstance.patch("/engine", null, {
            params: {
                id,
                status: "drive"
            }
        })
            .then(({data}) => data)
            .catch(({ message, response }) => {
                if(response?.status === 500) {
                    console.warn(`Car ${id} is broken`);
                    return;   
                }
                console.error(message || "Error occured");
                return false;
            })
    }  catch (err) {
        const {message = "Error occured while fetching"} = {...err || {}}
        console.error(message)
    }
}

export default checkOnCar;