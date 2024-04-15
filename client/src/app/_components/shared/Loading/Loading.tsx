import styles from  "../../../_styles/shared/Loading/Loading.module.scss";
import Fog from "../Fog/Fog";
import Wheel from "./components/Wheel/Wheel";

const GlobalLoading = ({ show, zIndex }: any) => (
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
                <Wheel side='left' />
                <Wheel side='right' />
            </div>
            <div className={styles.loading__pipe} />
        </div>
    </div>

)

export default GlobalLoading;