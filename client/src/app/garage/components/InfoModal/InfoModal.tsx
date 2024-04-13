"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { PiTimer } from "react-icons/pi";
import { motion } from "framer-motion";

import styles from "../../../_styles/Garage/components/InfoModal.module.scss";
import CarIcon from "../../../_components/shared/CarIcon/CarIcon";
import addWinner from "../../../_requests/addWinner";
import { SHOW_WINNER_TIME, START_RACE_TIMEOUT } from "../../../_configs/garage";

const numberVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const InfoModal = ({ winner, allRacing }: any) => {
    const [countdown, setCountdown] = useState<number>(3);
    const [showContent, setShowContent] = useState<"countdown" | "winner" | null>(null);

    const rtimeRef = useRef<any>();

    const addNewWinner = useCallback(async (winnerData: any) => {
        const result = await addWinner(winnerData);
        if (result) {
            setShowContent("winner");
            setTimeout(() => {
                setShowContent(null);
            }, SHOW_WINNER_TIME)
        }
    }, [setShowContent])

    useEffect(() => {
        if (allRacing === "ready" && !showContent) {
            setShowContent("countdown");
            setCountdown(START_RACE_TIMEOUT);
            if (rtimeRef.current) return;
            rtimeRef.current = setInterval(() => {
                setCountdown(curr => {
                    if (curr === 1) {
                        setShowContent(null);
                        clearInterval(rtimeRef.current);
                        rtimeRef.current = null;
                    }
                    return curr > 1 ? curr - 1 : 1
                });
            }, 1000);
        }
    }, [allRacing, setShowContent, showContent])

    useEffect(() => {
        if (winner) {
            addNewWinner(winner);
        }
    }, [winner, addNewWinner])

    return (
        <div
            className={styles.show_modal}
            style={{
                visibility: showContent ? "visible" : "hidden",
            }}>
            {showContent === "countdown" && <motion.h1
                key={countdown}
                className={styles.show_modal__count}
                variants={numberVariants}
                initial="initial"
                animate="animate"
            >
                {countdown}
            </motion.h1>}
            {showContent === "winner" && (
                <>
                    <CarIcon color={winner?.color} />
                    <p className={styles.show_modal__winner_name}>
                        {winner?.name}
                    </p>
                    <div className={styles.show_modal__time}>
                        <PiTimer className={styles.show_modal__time__icon} />
                        {winner?.time || "1s"}
                    </div>
                </>
            )}
        </div >
    )
}

export default InfoModal;