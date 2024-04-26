import { Car } from "./garage"

export type SortStatus = "desc" | "asc" | "default";

// object types 
export interface Winner extends Car {
  wins: number
  time: number
}

// props 

export interface WinnerTableProps {
    currentPage: number
    setwinnerData: Function
    setTotal: Function
    winner: Winner[]
}

export interface WinnerTableBodyProps {
  currentPage: number
  winner: Winner[]
}