import styles from "../../../_styles/components/shared/Loading/Loading.module.scss";
import Fog from "../Fog/Fog";
import Wheel from "./components/Wheel/Wheel";
import type { LoadingProps } from "../../../_types/components/shared/loading/loading";

const Loading = ({ show, zIndex }: LoadingProps) => (
    <div
        className={styles.loading}
        style={{
            display: show ? "flex" : "none",
            zIndex
        }}>
        <Fog />
        <div
            className={styles.loading__sportcar}
        >
            <div className={styles.loading__sportcar__cabin} />
            <div className={styles.loading__sportcar__base}>
                <Wheel
                    key="left"
                    side='left' />
                <Wheel
                    key="right"
                    side='right' />
            </div>
            <div className={styles.loading__pipe} />
        </div>
    </div>

)

export default Loading;