import type { AllRacing, Car } from "../pages/garage"
import type { Winner } from "../pages/winner"

export interface GarageContext {
    allReady: boolean
    allStopped: boolean
    setStoppedCars: Function
    winner: Winner
    selected: Car
    allRacing: AllRacing
    setWinner: Function
    setAllRacing: Function
    setSelected: Function
    setReadyCars: Function
    setLoading: Function
    getGarageItems: Function
}