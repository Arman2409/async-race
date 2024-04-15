"use client"
import { useCallback, useContext } from "react";
import { MdOutlineStart, MdOutlineCancel } from "react-icons/md";

import styles from "../../../_styles/Garage/components/GaaragActions/GarageActions.module.scss";
import { garageContext } from "../../../_context/garage";
import { START_RACE_TIMEOUT } from "../../../_configs/garage";
import generateCars from "../../../_requests/generateCars";
import GarageInputs from "./components/GarageInputs/GarageInputs";
import Button from "../../../_components/shared/Button/Button";
import generateRandomCarObjects from "./functions/generateRandomCarObjects";

const GarageActions = () => {
    const { allRacing, setAllRacing, setWinner, getGarageItems } = useContext(garageContext);
    const generateNewCars = useCallback(async () => {
        const newCars = generateRandomCarObjects();
        const generateResult = await generateCars(newCars);
        if (generateResult) {
            getGarageItems();
        }
    }, [getGarageItems])

    const cancelRace = useCallback(() => {
        setAllRacing("cancel");
        setTimeout(() =>  setAllRacing("initial"), 1000);
    }, [setAllRacing])

    const startRace = useCallback(() => {
        setAllRacing("ready");
        setWinner(null);
        setTimeout(() => {
            setAllRacing("started");
        }, START_RACE_TIMEOUT * 1000);
    }, [setAllRacing, setWinner])

    return (
        <div className={styles.garage_actions}>
            <div className={styles.garage_actions__buttons_container}>
                <MdOutlineStart
                    className={styles.garage_actions__buttons_container__start}
                    style={{
                        color: allRacing === "ready" || allRacing === "started" ? "green" : "",
                    }}
                    onClick={startRace} />
                <MdOutlineCancel
                    className={styles.garage_actions__buttons_container__finish}
                    onClick={cancelRace} />
            </div>
            <Button 
              text="Generate"
              onClick={generateNewCars}/>
            <GarageInputs />
        </div>
    )
}

export default GarageActions;