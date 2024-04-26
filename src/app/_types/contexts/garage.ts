import type { AllRacing, Car } from "../pages/garage"

export interface GarageContext {
    allReady: boolean
    allStopped: boolean
    itemsCount: number
    selected: Car
    allRacing: AllRacing
    setStoppedCars: Function
    setWinner: Function
    setAllRacing: Function
    setSelected: Function
    setReadyCars: Function
    setLoading: Function
    getGarageItems: Function
}