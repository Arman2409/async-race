export interface Light {
    x: number
    y: number
    color: "red" | "blue"
}

// props 

export interface LightProps {
    position: "left" | "right"
}
