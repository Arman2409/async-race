import axiosInstance from "./utils/axiosInstance"

const editCar = async ({id, ...rest}: any) => {
    return axiosInstance.patch(`/garage/${id}`, rest)
        .then(({ data }) => data)
        .catch(({ message }) => {
            console.error(message || "Error occured");
        })
}

export default editCar;