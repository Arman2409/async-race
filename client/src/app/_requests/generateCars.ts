import axiosInstance from "./utils/axiosInstance";

const generateCars = () => {
    try {
        
    } catch (err) {
        const { message = "Error occured while fetching" } = { ...err || {} }
        console.error(message)
    }
}

export default generateCars;