// props 
export interface GarageItemsProps {
    getGarageItems: Function
    garageItems: any[],
}
export interface GarageItemProps {
    id: string
    name: string
    color: string
    updateItems: Function
}

export interface FogProps {
    zIndex: number
    show: boolean
}

export interface CarProps {
    started: boolean
    color: string
}