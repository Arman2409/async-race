import { useCallback, useEffect, useState, useContext } from "react";
import { LuPaintbrush2 } from "react-icons/lu";
import { TbRestore } from "react-icons/tb";

import styles from "../../../../../_styles/pages/Garage/components/GaaragActions/GaragInputs/GarageInputs.module.scss";
import { CAR_NAME_MAX_LENGTH, ADD_INPUT_PLACEHOLDER, COLOR_INPUT_DEFAULT_COLOR } from "../../../../../_configs/garage";
import { garageContext } from "../../../../../_contexts/garage";
import editCar from "../../../../../_requests/editCar";
import addCar from "../../../../../_requests/addCar";
import Button from "../../../../../_components/shared/Button/Button";

const GarageInputs = () => {
    const [color, setColor] = useState<string>(COLOR_INPUT_DEFAULT_COLOR);
    const [name, setName] = useState<string>("");

    const { selected, setSelected, getGarageItems } = useContext(garageContext);

    const cancelEdit = useCallback(() => {
        setSelected(null);
        setName("");
        setColor(COLOR_INPUT_DEFAULT_COLOR);
    }, [setSelected, setName, setColor])

    const submit = useCallback(async () => {
        if (selected?.name) {
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
            setName("");
            setColor(COLOR_INPUT_DEFAULT_COLOR);
            getGarageItems && getGarageItems();
        }
    }, [name, color, selected, setName, cancelEdit, getGarageItems]);

    useEffect(() => {
        if (selected?.name) {
            setColor(selected?.color || COLOR_INPUT_DEFAULT_COLOR)
            setName(selected?.name)
        }
    }, [selected, setColor, setName])

    return (
        <div  className={styles.actions_input_cont}>
            {selected?.name && <TbRestore
                className={styles.actions_input_cont__cancel_edit}
                onClick={cancelEdit} />}
            <input
                type="text"
                value={name}
                placeholder={ADD_INPUT_PLACEHOLDER}
                className={styles.actions_input}
                maxLength={CAR_NAME_MAX_LENGTH}
                onChange={event => setName(event?.target?.value)} />
            <div className={styles.actions_color_input_cont}>
                <LuPaintbrush2
                    className={styles.actions_color_input_cont__icon} />
                <input
                    value={color}
                    type="color"
                    className={styles.actions_color_input}
                    onChange={({target}) => setColor(target?.value)} />
            </div>
            <Button
                disabled={!name}
                text={selected?.name ? "Edit" : "Add"}
                onClick={submit} />
        </div>
    )
}

export default GarageInputs;