export interface ButtonProps {
    text: string
    onClick: Function
    isActive?: boolean
    type?: "update" | "delete"
}