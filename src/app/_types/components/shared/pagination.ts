//  props

export interface PaginationProps {
    current: number
    total: number
    setCurrent: Function
    perPage?: number
    itemsCount?: number
    opacity?: number
}