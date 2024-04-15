export interface ButtonProps {
    text: string
    onClick: Function
    isActive?: boolean
    disabled?: boolean
    type?: "update" | "delete"
}