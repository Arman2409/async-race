import { useCallback } from "react";

import styles from "../../../../../../../_styles/pages/Garage/components/GarageItems/components/GarageItem/components/ItemActions.module.scss";
import deleteCar from "../../../../../../../_requests/deleteCar";
import Button from "../../../../../../../_components/shared/Button/Button";
import type { ItemActionsProps } from "../../../../../../../_types/pages/garage/garage";

const ItemActions = ({
    id,
    name,
    color,
    setSelected,
    updateItems
}: ItemActionsProps) => {
    const deleteCurrent = useCallback(async () => {
        const deleteResult = await deleteCar(id);
        if (deleteResult) {
            updateItems && updateItems();
        }
    }, [id, updateItems]);

    const selectCurrent = useCallback(() => {
        setSelected({
            id,
            name,
            color
        });
    }, [id, name, color, setSelected]);

    return (
        <div className={styles.actions_cont}>
            <Button
                text="Select"
                type="update"
                onClick={selectCurrent} />
            <Button
                text="Remove"
                type="delete"
                onClick={deleteCurrent} />
        </div>
    )
}

export default ItemActions;