import axiosInstance from "./utils/axiosInstance";

const addWinner = async ({ id, time, ...rest }: any) => {
    try {
        const alreadyExisting: any = await axiosInstance.get(`/winners/${id}`)
            .catch(() => null);
        if (alreadyExisting?.data) {
            let {wins = 0, time: existingTime = 0} = {...alreadyExisting.data || {}}
            return await axiosInstance.patch(`/winners/${id}`, {
                wins: wins += 1,
                time: existingTime < time ? existingTime : time,
            })
                .catch(() => null);
        }
        return axiosInstance.post("/winners", {
            id,
            time,
            wins: 1,
            ...rest
        })
            .then(({ data }) => data)
            .catch(() => null);    

    } catch (err) {
        const {message = "Error occured while fetching"} = {...err || {}}
        console.error(message)
    }
}

export default addWinner;