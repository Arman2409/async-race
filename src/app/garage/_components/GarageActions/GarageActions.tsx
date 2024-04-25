"use client"
import { useCallback, useContext, useEffect } from "react";
import { MdOutlineStart, MdOutlineCancel } from "react-icons/md";

import styles from "../../../_styles/pages/Garage/components/GaaragActions/GarageActions.module.scss";
import { garageContext } from "../../../_context/garage";
import generateCars from "../../../_requests/generateCars";
import generateRandomCarObjects from "./functions/generateRandomCarObjects";
import GarageInputs from "./components/GarageInputs/GarageInputs";
import Button from "../../../_components/shared/Button/Button";
import type { AllRacing } from "../../../_types/pages/garage";

const GarageActions = () => {
    const { allRacing, allReady, allStopped, setReadyCars, setLoading, setAllRacing, setWinner, getGarageItems } = useContext(garageContext);
    const generateNewCars = useCallback(async () => {
        const newCars = generateRandomCarObjects();
        const generateResult = await generateCars(newCars);
        if (generateResult) getGarageItems();
    }, [getGarageItems])

    const cancelRace = useCallback(() => {
        if (allRacing === "initial") return;
        setAllRacing("cancel");
        setReadyCars([]);
        setLoading(true);
    }, [setAllRacing, setLoading, setReadyCars, allRacing])

    const startRace = useCallback(() => {
        setAllRacing((curr: AllRacing) => curr === "initial" ? "ready" : curr);
        setWinner(null);
    }, [setAllRacing, setWinner])

    useEffect(() => {
        if (allReady && allRacing == "ready") {
            setAllRacing("started");
        }
    }, [allReady, allRacing, setAllRacing])

    useEffect(() => {
        if (allStopped) {
            setAllRacing("initial");
        }
    }, [allStopped, setAllRacing])

    return (
        <div className={styles.garage_actions}>
            <div className={styles.garage_actions__buttons_container}>
                <MdOutlineStart
                    className={`${styles.garage_actions__buttons_container__start}  ${allRacing !== "initial" ? "disabled" : ""}`}
                    style={{
                        color: allRacing !== "initial" ? "green" : "",
                    }}
                    onClick={startRace} />
                <MdOutlineCancel
                    className={`${styles.garage_actions__buttons_container__finish}  ${allRacing === "initial" ? "disabled" : ""}`}
                    onClick={cancelRace} />
                <Button
                    text="Generate"
                    disabled={allRacing !== "initial"}
                    onClick={generateNewCars} />
            </div>
            <GarageInputs />
        </div>
    )
}

export default GarageActions;