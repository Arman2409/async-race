"use client"
import { useCallback, useEffect, useState } from "react";
import { LuPaintbrush2 } from "react-icons/lu";
import { TbRestore } from "react-icons/tb";

import styles from "../../../_styles/Garage/components/ActionsInput.module.scss";
import addCar from "../../../_requests/addCar";
import editCar from "../../../_requests/editCar";
import Button from "../../../_components/shared/Button/Button";

const ActionsInput = ({ selected, setSelected, getGarageItems }: any) => {
    const [color, setColor] = useState<string>("");
    const [name, setName] = useState<string>("");

    const submit = useCallback(async () => {
        if (selected) {
            const editResult = await editCar({
                id: selected.id,
                color,
                name
            });
            if (editResult) {
                getGarageItems();
                return cancelEdit();
            }
        }
        const addResult = await addCar(
            {
                name,
                color
            }
        )
        if (addResult) {
            getGarageItems && getGarageItems();
        }
    }, [name, color, selected, setSelected, setName, setColor, getGarageItems]);

    const cancelEdit = useCallback(() => {
        setSelected(null);
        setName("");
        setColor("");
    }, [setSelected, setName, setColor])

    useEffect(() => {
        if (selected) {
            setColor(selected?.color)
            setName(selected?.name)
        }
    }, [selected, setColor, setName])

    return (
        <div className={styles.actions_input_cont}>
            {selected && <TbRestore
             className={styles.actions_input_cont__cancel_edit} 
             onClick={cancelEdit} />}
            <input
                type="text"
                value={name}
                className={styles.actions_input}
                onChange={event => setName(event?.target?.value)} />
            <div className={styles.actions_color_input_cont}>
                <LuPaintbrush2
                    className={styles.actions_color_input_cont__icon} />
                <input
                    value={color}
                    type="color"
                    className={styles.actions_color_input}
                    onChange={event => setColor(event?.target?.value)} />
            </div>
            <Button
                disabled={!name}
                text={selected ? "Edit" : "Add"}
                onClick={submit} />
        </div>
    )
}

export default ActionsInput;