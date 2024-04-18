import { Car } from "../garage/garage"

// object types 
export interface Winner extends Car {
  wins: number
  time: number
}

// props 

export interface WinnersTableProps {
    currentPage: number
    setWinnersData: Function
    setTotal: Function
    winners: Winner[]
}

export interface WinnersTableBodyProps {
  currentPage: number
  winners: Winner[]
}