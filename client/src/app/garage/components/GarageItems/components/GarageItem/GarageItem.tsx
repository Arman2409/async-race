import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineStart, MdOutlineCancel } from "react-icons/md";

import styles from "../../../../../_styles/Garage/components/GarageItems/components/GarageItem/GarageItem.module.scss";
import { CAR_NAME_MAX_LENGTH } from "../../../../../_configs/garage";
import deleteCar from "../../../../../_requests/deleteCar";
import updateCarStatus from "../../../../../_requests/updateCarStatus";
import checkOnCar from "../../../../../_requests/checkOnCar";
import cutString from "../../../../../_helpers/cutString";
import type { GarageItemProps } from "../../../../../_types/garage";
import Car from "./components/Car/Car";
import Button from "../../../../../_components/shared/Button/Button";

const GarageItem = (
  { name,
    id,
    color,
    updateItems,
    setSelected, 
    allRacing, 
    setWinner, 
    setAllRacing
  }: GarageItemProps & any) => {
  const [carStatus, setCarStatus] = useState<"started" | "finished" | "broken" | "initial">("initial");
  const [driveDetails, setDriveDetails] = useState<{ velocity: number, distance: number }>({} as any);
  const [highwayWidth, setHighwayWidth] = useState<number>(0);
  const [resetCar, setResetCar] = useState<boolean>(false);
  const highway = useRef<any>();

  const startRace = useCallback(async () => {
    if (carStatus !== "initial") return;
    const startResult:any = await updateCarStatus(id, "started");
    if (startResult) {
      setCarStatus("started");
      setDriveDetails(startResult);
      const checkOnResult: any = await checkOnCar(id);
      if (!checkOnResult?.success) {
        setCarStatus("broken");
      }
    }
  }, [setDriveDetails, setCarStatus, carStatus])

  const getStoppedStatus = useCallback(async () => await updateCarStatus(id, "stopped"), [])

  const finishRace = useCallback(async () => {
    const stoppedStatus = await getStoppedStatus();
    if (stoppedStatus) {
      setCarStatus(curr => {
        if (curr === "started") {
          return "finished";
        }
        return curr
      });
    }
  }, [setCarStatus, getStoppedStatus])

  const cancelRace = useCallback(async () => {
    const stoppedStatus = await getStoppedStatus();
    if (stoppedStatus) {
      setCarStatus("initial");
    }
  }, [getStoppedStatus, setCarStatus])

  const deleteCurrent = useCallback(async () => {
    const deleteResult = await deleteCar(id);
    if (deleteResult) {
      updateItems && updateItems();
    }
  }, [updateItems]);

  const selectCurrent = useCallback(() => {
    setSelected({
      id,
      name,
      color
    });
  }, [id, name, color, setSelected]);

  useEffect(() => {
    setHighwayWidth(highway.current.offsetWidth);
  }, [setHighwayWidth])

  useEffect(() => {
    switch (allRacing){
      case "started":
         startRace();
         break; 
      case "ready":
         cancelRace();
         break;
      case "cancel":
         cancelRace();
         break;
    }
  }, [allRacing, cancelRace])

  useEffect(() => {
    if (carStatus === "finished" && allRacing === "started") {
      setWinner((winner: any) => {
        if (!winner) {
          return {
            id,
            name,
            color,
            time: driveDetails.velocity / highwayWidth
          }
        }
        return winner;
      })
    }
  }, [carStatus, setAllRacing])

  return (
    <div
      className={styles.garage_item}
    >
      <div className={styles.garage_item__actions_cont}>
        <Button
          text="Select"
          type="update"
          onClick={selectCurrent} />
        <Button
          text="Remove"
          type="delete"
          onClick={deleteCurrent} />
      </div>
      <div className={styles.garage_item__drive_buttons}>
        <MdOutlineStart
          color={carStatus !== "initial" ? "green" : ""}
          className={styles.garage_item__drive_buttons_start}
          onClick={startRace} />
        <MdOutlineCancel
          className={styles.garage_item__drive_buttons_cancel}
          onClick={cancelRace}
        />
      </div>
      <div
        ref={highway}
        className={styles.garage_item__highway}>
        <div
          className={styles.garage_item__stripes} />
        <Car
          color={color}
          status={carStatus}
          setStatus={setCarStatus}
          driveDetails={driveDetails}
          highwayWidth={highwayWidth}
          resetCar={resetCar}
          winner={setWinner}
          finishRace={finishRace}
          setResetCar={setResetCar}
        />
        <p className={styles.garage_item__name}>
          {cutString(name, CAR_NAME_MAX_LENGTH)}
        </p>
      </div>
    </div>
  )
}

export default GarageItem;