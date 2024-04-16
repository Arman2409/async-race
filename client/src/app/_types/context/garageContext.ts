import type { AllRacing, Car } from "../pages/garage/garage"
import type { Winner } from "../pages/winners/winner"

export interface GarageContext {
    winner: Winner
    selected: Car
    allRacing: AllRacing
    setWinner:Function
    setAllRacing:Function
    setSelected: Function
    getGarageItems: Function
}