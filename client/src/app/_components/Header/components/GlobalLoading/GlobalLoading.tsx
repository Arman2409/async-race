import styles from "../../../../_styles/Header/components/GlobalLoading/GlobalLoading.module.scss";
import Fog from "../../../../_components/shared/Fog/Fog";
import Wheel from "./components/Wheel/Wheel";

const GlobalLoading = ({ show }: any) => (
    <div
        className={styles.global_loading}
        style={{
            display: show ? "flex" : "none",
        }}>
        <Fog />
        <div
            className={styles.global_loading__sportcar}
        >
            <div className={styles.global_loading__sportcar__cabin} />
            <div className={styles.global_loading__sportcar__base}>
                <Wheel side='left' />
                <Wheel side='right' />
            </div>
            <div className={styles.pipe} />
        </div>
    </div>

)

export default GlobalLoading;