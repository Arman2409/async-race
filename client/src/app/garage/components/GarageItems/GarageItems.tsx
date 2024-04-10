"use client"
import styles from "../../../_styles/Garage/components/GarageItems/GarageItems.module.scss";
import GarageItem from "./components/GarageItem/GarageItem";
import type { GarageItemsProps } from "../../../_types/garage";

const GarageItems = (
    { setSelected,
        garageItems,
        getGarageItems }: GarageItemsProps) => (
    <div className={styles.garage_items}>
        {garageItems.map((item: any) => (
            <GarageItem
                key={item?.id}
                updateItems={getGarageItems}
                setSelected={setSelected}
                {...item} />
        ))}
    </div>
)

export default GarageItems;