import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineStart, MdOutlineCancel } from "react-icons/md";

import styles from "../../../../../_styles/pages/Garage/components/GarageItems/components/GarageItem/GarageItem.module.scss";
import { CAR_NAME_MAX_LENGTH } from "../../../../../_configs/garage";
import updateCarStatus from "../../../../../_requests/updateCarStatus";
import checkOnCar from "../../../../../_requests/checkOnCar";
import cutString from "../../../../../_helpers/cutString";
import { roundToPrecision } from "./utils/functions";
import Car from "./components/Car/Car";
import ItemActions from "./components/ItemActions/ItemActions";
import type { CarStatus, DriveDetails, GarageItemProps } from "../../../../../_types/pages/garage/garage";
import type { Winner } from "../../../../../_types/pages/winners/winner";

const GarageItem = (
  { name,
    id,
    color,
    isLast,
    updateItems,
    setSelected,
    allRacing,
    setWinner,
    setReadyCars,
    setAllRacing,
    setStoppedCars
  }: GarageItemProps) => {
  const [carStatus, setCarStatus] = useState<CarStatus>("initial");
  const [driveDetails, setDriveDetails] = useState<DriveDetails>({} as DriveDetails);
  const [highwayWidth, setHighwayWidth] = useState<number>(0);
  const highway = useRef<HTMLDivElement>(null);

  const checkCarStatus = useCallback(async () => {
    const checkOnResult = await checkOnCar(id);
    if (!checkOnResult?.success) {
      setCarStatus(curr => {
        if (curr === "initial" || curr === "waiting") return curr;
        if (allRacing === "ready" || allRacing === "cancel") return curr;
        return "broken";
      });
    }
  }, [id, setCarStatus, allRacing]);

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
        setReadyCars((curr: string[]) => curr.concat(id));
      } else {
        setCarStatus("started");
        checkCarStatus();
      }
      setDriveDetails(startResult);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setDriveDetails, checkCarStatus, setCarStatus])

  const getStoppedStatus = useCallback(async () => await updateCarStatus(id, "stopped"), [id])

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
      if (allRacing === "cancel") {
        setStoppedCars((curr: string[]) => curr.concat(id));
      }
      setCarStatus("initial");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStoppedStatus, setStoppedCars, setCarStatus, startRace, allRacing])

  useEffect(() => {
    if (highway.current) {
      setHighwayWidth(highway.current.offsetWidth);
      window.addEventListener("resize", () => {
        if (highway.current) setHighwayWidth(highway.current.offsetWidth);
      })
    }
  }, [setHighwayWidth])

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
      setWinner((winner: Winner) => {
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
  }, [id, name, carStatus, allRacing, color, driveDetails, highwayWidth, setAllRacing, setWinner])

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
          className={`${styles.garage_item__drive_buttons_start}  ${carStatus !== "initial" ? "disabled" : ""}`}
          onClick={() => startRace()} />
        <MdOutlineCancel
          className={`${styles.garage_item__drive_buttons_cancel}  ${carStatus === "initial" ? "disabled" : ""}`}
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
          finishRace={finishRace}
        />
        <p className={styles.garage_item__name}>
          {cutString(name, CAR_NAME_MAX_LENGTH)}
        </p>
      </div>
    </div>
  )
}

export default GarageItem;