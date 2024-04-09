import styles from "./_styles/Garage/Garage.module.scss";
import ActionsInput from "./garage/components/ActionsInput/ActionsInput";
import GarageItems from "./garage/components/GarageItems/GarageItems";

const Garage = () => {
  return (
    <div className={styles.garage}>
      <ActionsInput />
      <GarageItems />
    </div>
  );
}

export default Garage;