import axiosInstance from "./utils/axiosInstance";

const checkOnCar = async (id: string) => {
    try {
        const response = await axiosInstance.patch("/engine", null, {
            params: {
                id,
                status: "drive",
            },
        });
        return response.data;
    } catch (err) {
        const { message = "Error occured while fetching", response = {} } = { ...err || {} };
        if ((response as Response).status === 500) {
            console.warn(`Car ${id} is broken`);
            return false;
        }
        console.error(message);
        return false;
    }
};

export default checkOnCar;