"use client"
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import styles from "./_styles/pages/Garage/Garage.module.scss";
import { GARAGE_PER_PAGE } from "./_configs/garage";
import { paginationContext } from "./_context/pagination/context";
import { garageContext } from "./_context/garage";
import getTableData from "./_requests/getTableData";
import Pagination from "./_components/shared/Pagination/Pagination";
import GarageActions from "./garage/_components/GarageActions/GarageActions";
import GarageItems from "./garage/_components/GarageItems/GarageItems";
import InfoModal from "./garage/_components/InfoModal/InfoModal";
import Loading from "./_components/shared/Loading/Loading";
import type { Car } from "./_types/pages/garage";
import type { Winner } from "./_types/pages/winner";

const Garage = () => {
  const [allRacing, setAllRacing] = useState<"started" | "ready" | "cancel" | "initial">("initial");
  const [selected, setSelected] = useState<Car>({} as Car);
  const [winner, setWinner] = useState<Winner>({} as Winner);
  const [garageItems, setGarageItems] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [readyCars, setReadyCars] = useState<string[]>([]);
  const [stoppedCars, setStoppedCars] = useState<string[]>([]);

  const { garagePage } = useContext(paginationContext);
  const [currentPage, setCurrentPage] = useState<number>(garagePage || 1);

  const allReady = useMemo(() => readyCars.length === garageItems.length, [readyCars, garageItems]);
  const allStopped = useMemo(() => stoppedCars.length === garageItems.length, [stoppedCars, garageItems]);

  const getGarageItems = useCallback(async () => {
    setLoading(true);
    const { data, total: totalItems } = await getTableData("garage", currentPage);
    setTotal(totalItems);
    setGarageItems(data || []);
    setLoading(false)
  }, [currentPage, setTotal, setGarageItems, setLoading])

  useEffect(() => {
    getGarageItems();
    setAllRacing(curr => curr === "initial" ? "initial" : "cancel");
    setReadyCars([]);
    setStoppedCars([]);
  }, [currentPage, getGarageItems, setReadyCars, setStoppedCars]);

  useEffect(() => {
    if (allRacing === "cancel") {
      setStoppedCars([]);
    }
    if(allRacing === "initial") {
      setLoading(false);
    }
  }, [allRacing, setStoppedCars])

  return (
    <garageContext.Provider value={{
      winner,
      allRacing,
      selected,
      allReady,
      setLoading,
      allStopped,
      setReadyCars,
      setAllRacing,
      setWinner,
      setSelected,
      setStoppedCars,
      getGarageItems
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
            type="garage"
            itemsCount={garageItems.length}
          />
        </div>
      </>

    </garageContext.Provider>
  );
}

export default Garage;