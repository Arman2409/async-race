import { useCallback, useContext, useEffect, useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

import styles from "../../../_styles/components/shared/Pagination.module.scss";
import { paginationContext } from "../../../_contexts/pagination/context";
import type { PaginationProps } from "../../../_types/components/shared/pagination";

const Pagination = (
  {
    current = 1,
    opacity = 1,
    setCurrent,
    perPage = 7,
    total = 0,
    itemsCount = 7,
    type
  }: PaginationProps) => {
  const [disabledLeft, setDisabledLeft] = useState<boolean>(true);
  const [disabledRight, setDisabledRight] = useState<boolean>(false);

  const { setWinnerPage, setGaragePage } = useContext(paginationContext);

  const changePage = useCallback((direction: "next" | "prev") => {
    setCurrent((curr: number) => {
      const newPage = direction === "prev" ? curr -= 1 : curr += 1;
      if (type === "garage") setGaragePage(newPage);
      if (type === "winner") setWinnerPage(newPage);
      return newPage;
    });
  }, [setCurrent, setGaragePage, setWinnerPage])

  useEffect(() => {
    setDisabledLeft(current === 1);
    setDisabledRight(perPage > itemsCount);
  }, [current, perPage, itemsCount, setDisabledLeft, setDisabledRight])

  return (
    <div
      className={styles.pagination}
    >
      <div className={styles.pagination__total}>
        {total}
      </div>
      <div
        className={styles.pagination__content}
        style={{ opacity }} >
        <FaAnglesLeft
          onClick={!disabledLeft ? () => changePage("prev") : () => { }}
          className={disabledLeft ? styles.pagination__content__arrow__disabled : styles.pagination__content__arrow} />
        <span className={styles.pagination__content__page}>
          {current}
        </span>
        <FaAnglesRight
          onClick={!disabledRight ? () => changePage("next") : () => { }}
          className={disabledRight ? styles.pagination__content__arrow__disabled : styles.pagination__content__arrow} />
      </div>
    </div>
  );
}

export default Pagination;