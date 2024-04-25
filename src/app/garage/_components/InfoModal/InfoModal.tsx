"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PiTimer } from "react-icons/pi";
import { motion } from "framer-motion";

import styles from "../../../_styles/pages/Garage/components/InfoModal.module.scss";
import { SHOW_WINNER_TIME, START_RACE_TIMEOUT } from "../../../_configs/garage";
import addWinner from "../../../_requests/addWinner";
import { numberVariants } from "./utils/variants";
import CarIcon from "../../../_components/shared/CarIcon/CarIcon";
import type { InfoModalProps } from "../../../_types/pages/garage";
import type { Winner } from "../../../_types/pages/winner";

const InfoModal = ({ winner, allRacing, allReady}: InfoModalProps) => {
    const [countdown, setCountdown] = useState<number>(START_RACE_TIMEOUT);
    const [showContent, setShowContent] = useState<"countdown" | "winner" | null>(null);

    const countInterval = useRef<NodeJS.Timeout | string>("");

    const addNewWinner = useCallback(async (winnerData: Winner) => {
        const result = await addWinner(winnerData);
        if (result) {
            setShowContent("winner");
            setTimeout(() => {
                setShowContent(null);
            }, SHOW_WINNER_TIME * 1000)
        }
    }, [setShowContent])

    useEffect(() => {
        if (allRacing === "ready" && !showContent) {
            setShowContent("countdown");
            setCountdown(START_RACE_TIMEOUT);
            if (countInterval.current) return;
            countInterval.current = setInterval(() => {
                setCountdown((curr:number) => {
                    if (curr === 0) {
                        clearInterval(countInterval.current);
                        countInterval.current = "";
                        if (!allReady) return curr;
                        setShowContent(null);
                        return curr;
                    }
                    return curr > 0 ? curr - 1 : 0
                });
            }, 1000);
        }
    }, [allRacing, setShowContent, showContent, allReady])

    useEffect(() => {
        if (winner?.name) addNewWinner(winner);
    }, [winner, addNewWinner])

    useEffect(() => {
        if (allReady) {
            setShowContent(null);
        }
    }, [allReady, setShowContent]);

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
                    <Image
                        alt="Winner!"
                        width={250}
                        height={250}
                        src="/winner.png" />
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