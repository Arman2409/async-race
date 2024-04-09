import styles from "../../../_styles/shared/Button.module.scss";
import type { ButtonProps } from "../../../_types/shared/button";

const Button = (
    {
        isActive,
        onClick,
        type,
        text }: ButtonProps) => {
    const mainClass = isActive ? styles.button__active : type ?  styles[`button__${type}`] : styles.button;

    return (
        <button
            onClick={() => onClick()}
            className={mainClass}>
            {text}
        </button>
    )
}

export default Button;