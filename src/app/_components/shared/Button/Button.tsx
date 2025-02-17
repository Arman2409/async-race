import styles from "../../../_styles/components/shared/Button.module.scss";
import type { ButtonProps } from "../../../_types/components/shared/button";

const Button = (
    {
        isActive,
        onClick,
        type,
        disabled,
        text }: ButtonProps) => {
    const mainClass = isActive ? styles.button__active : type ?  styles[`button__${type}`] : styles.button;

    return (
        <button
            onClick={disabled ? () => {} : () => onClick()}
            className={`${mainClass} ${disabled ? styles.button__disabled : ""}`}
            >
            {text}
        </button>
    )
}

export default Button;