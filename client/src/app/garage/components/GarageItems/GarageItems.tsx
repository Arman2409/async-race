"use client"
import { useCallback, useEffect, useState } from "react";

import styles from "../../../_styles/Garage/components/GarageItems/GarageItems.module.scss";
import { getTableData } from "../../../_helpers/fetchDB";
import Pagination from "../../../_components/shared/Pagination/Pagination";
import GarageItem from "./components/GarageItem/GarageItem";

const GarageItems = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [garageItems, setGarageItems] = useState<any[]>([]);

    const getGarageItems = useCallback(async () => {
        const garageItemsData = await getTableData("garage", currentPage);
        setGarageItems(garageItemsData || []);
    }, [setGarageItems, currentPage])

    useEffect(() => {
        getGarageItems();
    }, [currentPage, getGarageItems])

    return (
        <div className={styles.garage_items}>
            {garageItems.map((item: any) => {
                return <GarageItem
                    key={item?.id}
                    updateItems={getGarageItems}
                    {...item} />
            })}
            <Pagination
                current={currentPage}
                setCurrent={setCurrentPage}
                perPage={8}
                itemsCount={garageItems.length}
            />
        </div>
    )
}

export default GarageItems;