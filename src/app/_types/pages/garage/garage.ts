import type { Winner } from "../winners/winner"

export type AllRacing = "started" | "ready" | "cancel" | "initial"

export type CarStatus = "started" | "finished" | "broken" | "initial" | "waiting"

// object types 
export type DriveDetails = {
    velocity: number
    distance: number
}

export type Car = {
    id: string
    name: string
    color: string
}

export type CarPayload = Omit<Car, "id">

// props 
export interface GarageItemsProps {
    getGarageItems: Function
    garageItems: Car[],
}

export interface GarageItemProps {
    isLast: boolean
    id: string
    name: string
    color: string
    allRacing: AllRacing
    setReadyCars: Function
    updateItems: Function
    setSelected: Function
    setStoppedCars: Function
    setWinner: Function
    setAllRacing: Function
}

export interface ItemActionsProps {
    id: string
    name: string
    color: string
    setSelected: Function
    updateItems: Function
}

export interface FogProps {
    show?: boolean
    isBroken?: boolean
}

export interface CarProps {
    color: string
    highwayWidth: number
    status: CarStatus
    driveDetails: DriveDetails
    finishRace: Function
    setStatus: Function
}

export interface InfoModalProps {
    allReady: boolean
    winner: Winner
    allRacing: AllRacing
}
