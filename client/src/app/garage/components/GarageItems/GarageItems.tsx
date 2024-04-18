"use client"
import { useContext } from "react";

import styles from "../../../_styles/pages/Garage/components/GarageItems/GarageItems.module.scss";
import { garageContext } from "../../../_context/garage";
import GarageItem from "./components/GarageItem/GarageItem";
import type { GarageItemsProps } from "../../../_types/pages/garage/garage";

const GarageItems = (
    { garageItems,
        getGarageItems }: GarageItemsProps) => {
    const { setSelected, allRacing, setWinner, setReadyCars, setAllRacing } = useContext(garageContext)

    return (
        <div className={styles.garage_items}>
            {garageItems.map((item, index) => (
                <GarageItem
                    key={item?.id}
                    setSelected={setSelected}
                    allRacing={allRacing}
                    setWinner={setWinner}
                    setReadyCars={setReadyCars}
                    isLast={index === garageItems.length - 1}
                    setAllRacing={setAllRacing}
                    updateItems={getGarageItems}
                    {...item} />
            ))}
        </div>
    )
}

export default GarageItems;