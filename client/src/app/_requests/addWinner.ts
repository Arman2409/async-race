import axiosInstance from "./utils/axiosInstance";

const addWinner = async ({ id, time, ...rest }: any) => {
    try {
        const alreadyExisting: any = await axiosInstance.get(`/winners/${id}`)
            .catch(() => null);
            
        if (alreadyExisting?.data) {
            return await axiosInstance.patch(`/winners/${id}`, {
                wins: alreadyExisting.wins += 1,
                time: alreadyExisting.time > time ? time : alreadyExisting.time,
            });
        }
        return axiosInstance.post("/winners", {
            id,
            time,
            wins: 1,
            ...rest
        })
            .then(({ data }) => data)

    } catch ({ message }: any) {
        console.error(message || "Error occured")
    }
}

export default addWinner;