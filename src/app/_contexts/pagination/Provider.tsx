"use client"
import React, { useState } from 'react';

import { paginationContext } from './context';
import type { ProviderProps } from "../../_types/global";

const PaginationProvider = ({ children }: ProviderProps) => {
  const [winnerPage, setWinnerPage] = useState<number>(1);
  const [garagePage, setGaragePage] = useState<number>(1);

  return (
    <paginationContext.Provider value={
      {
        winnerPage,
        garagePage,
        setWinnerPage,
        setGaragePage
      }
      }>
      {children}
    </paginationContext.Provider>
  );
};

export default PaginationProvider;