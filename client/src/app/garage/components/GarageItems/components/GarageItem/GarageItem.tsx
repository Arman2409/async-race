import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineStart, MdOutlineCancel } from "react-icons/md";

import styles from "../../../../../_styles/Garage/components/GarageItems/components/GarageItem/GarageItem.module.scss";
import { CAR_NAME_MAX_LENGTH } from "../../../../../_configs/garage";
import updateCarStatus from "../../../../../_requests/updateCarStatus";
import checkOnCar from "../../../../../_requests/checkOnCar";
import cutString from "../../../../../_helpers/cutString";
import Car from "./components/Car/Car";
import ItemActions from "./components/ItemActions/ItemActions";
import type { GarageItemProps } from "../../../../../_types/garage";
import { roundToPrecision } from "./utils/functions";

const GarageItem = (
  { name,
    id,
    color,
    isLast,
    updateItems,
    setSelected,
    allRacing,
    setWinner,
    setAllRacing
  }: GarageItemProps & any) => {
  const [carStatus, setCarStatus] = useState<"started" | "finished" | "broken" | "initial" | "waiting">("initial");
  const [driveDetails, setDriveDetails] = useState<{ velocity: number, distance: number }>({} as any);
  const [highwayWidth, setHighwayWidth] = useState<number>(0);
  const [resetCar, setResetCar] = useState<boolean>(false);
  const highway = useRef<any>();

  const checkCarStatus = useCallback(async () => {
    const checkOnResult: any = await checkOnCar(id);
    if (!checkOnResult?.success) {
      setCarStatus((curr:any) => {
        if(curr !== "initial") return "broken";
        return curr;
        });
    }
  }, [setCarStatus]);

  const startRace = useCallback(async (wait?: boolean) => {
    if ((carStatus !== "initial" && carStatus !== "waiting") && !wait) return;
    if (carStatus === "waiting") {
      setCarStatus("started");
      checkCarStatus();
      return;
    }
    const startResult = await updateCarStatus(id, "started");
    if (startResult) {
      if (wait) {
        setCarStatus("waiting");
      } else {
        setCarStatus("started");
        checkCarStatus();
      }
      setDriveDetails(startResult);
    }
  }, [setDriveDetails, checkCarStatus, setCarStatus])

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
      if (allRacing === "ready") {
        setCarStatus("waiting");
        return;
      }
      setCarStatus("initial");
    }
  }, [getStoppedStatus, setCarStatus, allRacing])

  useEffect(() => {
    setHighwayWidth(highway.current.offsetWidth);
    window.addEventListener("resize", ({ target }: Event) => {
      setHighwayWidth(highway.current.offsetWidth);
    })
  }, [setHighwayWidth, window])

  useEffect(() => {
    switch (allRacing) {
      case "started":
        startRace();
        break;
      case "ready":
        cancelRace();
        startRace(true);
        break;
      case "cancel":
        cancelRace();
        break;
    }
  }, [allRacing, cancelRace, startRace])

  useEffect(() => {
    if (carStatus === "finished" && allRacing === "started") {
      setWinner((winner: any) => {
        if (!winner) {
          return {
            id,
            name,
            color,
            time: roundToPrecision(highwayWidth / driveDetails.velocity, 1)
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
      <ItemActions
        id={id}
        name={name}
        color={color}
        setSelected={setSelected}
        updateItems={updateItems}
      />
      <div className={styles.garage_item__drive_buttons}>
        <MdOutlineStart
          color={carStatus !== "initial" ? "green" : ""}
          className={styles.garage_item__drive_buttons_start}
          onClick={() => startRace()} />
        <MdOutlineCancel
          className={styles.garage_item__drive_buttons_cancel}
          onClick={cancelRace}
        />
      </div>
      <div
        ref={highway}
        className={styles.garage_item__highway}>
        {!isLast && <div
          className={styles.garage_item__stripes} />}
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