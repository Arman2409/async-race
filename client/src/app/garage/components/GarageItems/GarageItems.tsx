"use client"
import { useContext } from "react";

import styles from "../../../_styles/Garage/components/GarageItems/GarageItems.module.scss";
import { GarageContext } from "../../../_context/garage";
import GarageItem from "./components/GarageItem/GarageItem";
import type { GarageItemsProps } from "../../../_types/garage";

const GarageItems = (
    { garageItems,
        getGarageItems }: GarageItemsProps) => {
    const { setSelected, allRacing, setWinner, setAllRacing, setRacingCount } = useContext(GarageContext)

    return (
        <div className={styles.garage_items}>
            {garageItems.map((item: any, index:number) => (
                <GarageItem
                    key={item?.id}
                    setSelected={setSelected}
                    allRacing={allRacing}
                    setWinner={setWinner}
                    isLast={index === garageItems.length - 1}
                    setAllRacing={setAllRacing}
                    setRacingCount={setRacingCount}
                    updateItems={getGarageItems}
                    {...item} />
            ))}
        </div>
    )
}

export default GarageItems;