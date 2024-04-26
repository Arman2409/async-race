import axiosInstance from "./utils/axiosInstance";
import type { Winner } from "../_types/pages/winner";
import { handleFetchError } from "./utils/functions";

const addWinner = async ({ id, time, wins, ...rest }: Winner) => {
    try {
        const alreadyExisting = await axiosInstance.get(`/winner/${id}`)
            .catch(() => null);
        if (alreadyExisting?.data) {
            let { wins: existingWins = 0, time: existingTime = 0 } = { ...alreadyExisting.data || {} }
            return await axiosInstance.patch(`/winner/${id}`, {
                wins: existingWins += 1,
                time: existingTime < time ? existingTime : time,
            })
                .catch(() => null);
        }
        return axiosInstance.post("/winner", {
            id,
            time,
            wins: 1,
            ...rest
        })
            .then(({ data }) => data)
            .catch(() => null);

    } catch (err) {
        return handleFetchError(err);
    }
}

export default addWinner;