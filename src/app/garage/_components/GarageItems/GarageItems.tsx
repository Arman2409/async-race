"use client"
import { useContext } from "react";

import styles from "../../../_styles/pages/Garage/components/GarageItems/GarageItems.module.scss";
import { garageContext } from "../../../_contexts/garage";
import GarageItem from "./components/GarageItem/GarageItem";
import type { GarageItemsProps } from "../../../_types/pages/garage";

const GarageItems = (
    { garageItems,
        getGarageItems }: GarageItemsProps) => {
    const {
        allRacing,
        setSelected,
        setWinner,
        setStoppedCars,
        setReadyCars,
        setAllRacing,
    } = useContext(garageContext)

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
                    setStoppedCars={setStoppedCars}
                    {...item} />
            ))}
        </div>
    )
}

export default GarageItems;