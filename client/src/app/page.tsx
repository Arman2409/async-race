"use client"
import { useCallback, useEffect, useState } from "react";

import styles from "./_styles/Garage/Garage.module.scss";
import getTableData from "./_requests/getTableData";
import { GarageContext } from "./_context/garage";
import Pagination from "./_components/shared/Pagination/Pagination";
import GarageActions from "./garage/components/GarageActions/GarageActions";
import GarageItems from "./garage/components/GarageItems/GarageItems";
import InfoModal from "./garage/components/InfoModal/InfoModal";

const Garage = () => {
  const [allRacing, setAllRacing] = useState<|"started"|"ready"|"cancel">("cancel");
  const [racingCount, setRacingCount] = useState<number>(0);
  const [selected, setSelected] = useState<any>();
  const [winner, setWinner] = useState<any>();
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
    <GarageContext.Provider value={{ 
      setAllRacing, 
      winner, 
      setWinner, 
      allRacing, 
      selected, 
      setSelected, 
      getGarageItems,
      racingCount,
      setRacingCount }}>
      <div className={styles.garage}>
        <InfoModal 
          winner={winner}
          allRacing={allRacing}
        />
        <GarageActions />
        <GarageItems
          garageItems={garageItems}
          getGarageItems={getGarageItems}
        />
        <Pagination
          current={currentPage}
          setCurrent={setCurrentPage}
          perPage={8}
          itemsCount={garageItems.length}
        />
      </div>
    </GarageContext.Provider>
  );
}

export default Garage;