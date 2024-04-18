"use client"
import { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./_styles/pages/Garage/Garage.module.scss";
import { GARAGE_PER_PAGE } from "./_configs/garage";
import { garageContext } from "./_context/garage";
import getTableData from "./_requests/getTableData";
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
  const [total, setTotal] = useState<number>(0);
  const [readyCars, setReadyCars] = useState<string[]>([]);

  const allReady = useMemo(() => readyCars.length === garageItems.length, [readyCars, garageItems]);

  const getGarageItems = useCallback(async () => {
    setLoading(true);
    const {data, total: totalItems} = await getTableData("garage", currentPage);
    setTotal(totalItems);
    setGarageItems(data || []);
    setLoading(false)
  }, [currentPage, setTotal, setGarageItems, setLoading])

  useEffect(() => {
    getGarageItems();
    setAllRacing("initial");
  }, [currentPage, getGarageItems]);

  return (
    <garageContext.Provider value={{
      winner,
      allRacing,
      selected,
      allReady,
      setReadyCars,
      setAllRacing,
      setWinner,
      setSelected,
      getGarageItems,
    }}>
      <>
        <InfoModal
          winner={winner}
          allReady={allReady}
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
            total={total}
            itemsCount={garageItems.length}
          />
        </div>
      </>

    </garageContext.Provider>
  );
}

export default Garage;