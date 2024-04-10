"use client"
import { useCallback, useEffect, useState } from "react";
import getTableData from "./_requests/getTableData";
import styles from "./_styles/Garage/Garage.module.scss";
import ActionsInput from "./garage/components/ActionsInput/ActionsInput";
import GarageItems from "./garage/components/GarageItems/GarageItems";
import Pagination from "./_components/shared/Pagination/Pagination";

const Garage = () => {
  const [selected, setSelected] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [garageItems, setGarageItems] = useState<any[]>([]);

  const getGarageItems = useCallback(async () => {
    const garageItemsData = await getTableData("garage", currentPage);
    setGarageItems(garageItemsData || []);
  }, [setGarageItems, currentPage])

  useEffect(() => {
    getGarageItems();
  }, [currentPage, getGarageItems]);

  return (
    <div className={styles.garage}>
      <ActionsInput
        selected={selected}
        setSelected={setSelected}
        getGarageItems={getGarageItems} />
      <GarageItems
        garageItems={garageItems}
        getGarageItems={getGarageItems}
        setSelected={setSelected} />
      <Pagination
        current={currentPage}
        setCurrent={setCurrentPage}
        perPage={8}
        itemsCount={garageItems.length}
      />
    </div>
  );
}

export default Garage;