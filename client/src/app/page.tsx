"use client"
import { useCallback, useEffect, useState } from "react";

import styles from "./_styles/pages/Garage/Garage.module.scss";
import { GARAGE_PER_PAGE } from "./_configs/garage";
import getTableData from "./_requests/getTableData";
import { garageContext } from "./_context/garage";
import Pagination from "./_components/shared/Pagination/Pagination";
import GarageActions from "./garage/components/GarageActions/GarageActions";
import GarageItems from "./garage/components/GarageItems/GarageItems";
import InfoModal from "./garage/components/InfoModal/InfoModal";
import Loading from "./_components/shared/Loading/Loading";
import type { Car } from "./_types/pages/garage/garage";
import type { Winner } from "./_types/pages/winners/winner";

const Garage = () => {
  const [allRacing, setAllRacing] = useState<"started" | "ready" | "cancel" | "initial">("initial");
  const [selected, setSelected] = useState<Car>({} as Car);
  const [winner, setWinner] = useState<Winner>({} as Winner);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [garageItems, setGarageItems] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getGarageItems = useCallback(async () => {
    setLoading(true);
    const garageItemsData = await getTableData("garage", currentPage);
    setGarageItems(garageItemsData || []);
    setLoading(false)
  }, [currentPage, setGarageItems, setLoading])

  useEffect(() => {
    getGarageItems();
    setAllRacing("initial");
  }, [currentPage, getGarageItems]);

  return (
    <garageContext.Provider value={{
      winner,
      allRacing,
      selected,
      setAllRacing,
      setWinner,
      setSelected,
      getGarageItems,
    }}>
      <>
        <InfoModal
          winner={winner}
          allRacing={allRacing}
        />
        <div className={styles.garage}>
          <Loading
            show={loading}
            zIndex={9} />
          <GarageActions />
          <GarageItems
            garageItems={garageItems}
            getGarageItems={getGarageItems}
          />
          <Pagination
            current={currentPage}
            setCurrent={setCurrentPage}
            perPage={GARAGE_PER_PAGE}
            itemsCount={garageItems.length}
          />
        </div>
      </>

    </garageContext.Provider>
  );
}

export default Garage;