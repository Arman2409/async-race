//  props

export interface PaginationProps {
    type: "garage" | "winner"
    current: number
    total: number
    setCurrent: Function
    perPage?: number
    itemsCount?: number
    opacity?: number
}