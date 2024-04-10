import { useCallback } from "react";

import styles from "../../../../../_styles/Garage/components/GarageItems/components/GarageItem/GarageItem.module.scss";
import deleteCar from "../../../../../_requests/deleteCar";
import Button from "../../../../../_components/shared/Button/Button";
import Car from "./components/Car/Car";
import type { GarageItemProps } from "../../../../../_types/garage";

const GarageItem = (
  { name,
    id,
    color,
    updateItems,
    setSelected }: GarageItemProps) => {

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
      <Car started={true} color={color} />
      <div className={styles.garage_item__stripes}/>
      {name}
    </div>
  )
}

export default GarageItem;