import axiosInstance from "./utils/axiosInstance";
import type { Winner } from "../_types/pages/winners/winner";

const addWinner = async ({ id, time, wins, ...rest }: Winner) => {
    try {
        const alreadyExisting = await axiosInstance.get(`/winners/${id}`)
            .catch(() => null);
        if (alreadyExisting?.data) {
            let { wins: existingWins = 0, time: existingTime = 0 } = { ...alreadyExisting.data || {} }
            return await axiosInstance.patch(`/winners/${id}`, {
                wins: existingWins += 1,
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
        const { message = "Error occured while fetching" } = { ...err || {} }
        console.error(message)
    }
}

export default addWinner;