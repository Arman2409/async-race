//  props

export interface PaginationProps {
    current: number
    setCurrent: Function
    perPage?: number
    itemsCount?: number
    opacity?: number
}