import { FaTrophy } from "react-icons/fa6";

import styles from "../../../../../_styles/pages/Winner/components/WinnersTable/components/WinnersTableBody.module.scss";
import CarIcon from "../../../../../_components/shared/CarIcon/CarIcon";
import type { WinnersTableBodyProps } from "../../../../../_types/pages/winners/winner";

const WinnersTableBody = (
    {
        winners,
        currentPage }: WinnersTableBodyProps) => {
    return (
        <tbody>
            {winners.map(({ id, name, color, wins, time }, index) => (
                <tr
                    key={index}
                    className={styles[`winners_table_body__row_${index % 3 + 1}`]}>
                    <td style={{
                        position: currentPage === 1 && index < 3 ? 'relative' : 'static',
                    }}>
                        {currentPage === 1 && index < 3
                            && <FaTrophy className={styles[`winners_table_body__trophy_${index + 1}`]} />}
                        {id || "N/n"}
                    </td>
                    <td>
                        <div className={styles.winners_table_cont__table__car_icon}>
                            <CarIcon color={color} />
                        </div>
                    </td>
                    <td>{name || "N/n"}</td>
                    <td>{wins || "N/n"}</td>
                    <td>{time || "N/n"}</td>
                </tr>)
            )}
        </tbody>
    )
}

export default WinnersTableBody;