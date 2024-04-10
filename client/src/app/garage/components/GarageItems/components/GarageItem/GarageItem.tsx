import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineStart, MdOutlineCancel } from "react-icons/md";

import styles from "../../../../../_styles/Garage/components/GarageItems/components/GarageItem/GarageItem.module.scss";
import deleteCar from "../../../../../_requests/deleteCar";
import updateCarStatus from "../../../../../_requests/updateCarStatus";
import checkOnCar from "../../../../../_requests/checkOnCar";
import Button from "../../../../../_components/shared/Button/Button";
import Car from "./components/Car/Car";
import type { GarageItemProps } from "../../../../../_types/garage";

const GarageItem = (
  { name,
    id,
    color,
    updateItems,
    setSelected }: GarageItemProps) => {
  const [carStatus, setCarStatus] = useState<"started" | "finished" | "broken" | "initial">("initial");
  const [driveDetails, setDriveDetails] = useState<{ velocity: number, distance: number }>({} as any);
  const [highwayWidth, setHighwayWidth] = useState<number>(0);
  const [resetCar, setResetCar] = useState<boolean>(false);
  const highway = useRef<any>();

  const checkOnCarRecursively = useCallback(async () => {
    const checkOnResult: any = await checkOnCar(id);
    if (!checkOnResult?.success) {
      setCarStatus("broken");
      return;
    }
    if (carStatus !== "started") {
      return;
    }
    setTimeout(() => {
      return checkOnCarRecursively();
    }, 1000)
  }, [carStatus, setCarStatus])

  const startRace = useCallback(async () => {
    if (carStatus !== "initial") return;
    const startResult = await updateCarStatus(id, "started");
    if (startResult) {
      setCarStatus("started");
      setDriveDetails(startResult);
      checkOnCarRecursively();
    }
  }, [setDriveDetails, setCarStatus, carStatus])

  const cancelRace = useCallback(async () => {
    setCarStatus("initial");
  }, [setCarStatus])

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
          setResetCar={setResetCar}
        />
        <p className={styles.garage_item__name}>
          {name}
        </p>
      </div>
    </div>
  )
}

export default GarageItem;