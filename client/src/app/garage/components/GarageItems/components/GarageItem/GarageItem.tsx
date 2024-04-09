import { useCallback, useEffect } from "react";

import styles from "../../../../../_styles/Garage/components/GarageItems/components/GarageItem.module.scss";
import { deleteGarageItem } from "../../../../../_helpers/fetchDB";
import CarIcon from "./CarIcon";
import Button from "../../../../../_components/shared/Button/Button";

const GarageItem = ({ name, id, color, updateItems }: { updateItems: Function, name: string, id: string, color: string }) => {

  const deleteCurrent = useCallback(async () => {
    const deleteResult = await deleteGarageItem(id);
    if (deleteResult) {
      updateItems && updateItems();
    }
  }, [updateItems]);

  useEffect(() => {

  }, [])

  return (
    <div
      className={styles.garage_item}
    >
      <CarIcon color={color} />
      {name}
      <div className={styles.garage_item__actions_cont}>
        <Button
          text="Select"
          type="update"
          onClick={() => { }} />
        <Button
          text="Remove"
          type="delete"
          onClick={deleteCurrent} />
      </div>
    </div>
  )
}

export default GarageItem;