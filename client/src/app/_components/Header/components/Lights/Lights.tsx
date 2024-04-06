import { useEffect, useRef } from "react";

import styles from "../../../../_styles/Header/components/Lights.module.scss";
import type { LightsProps, Light } from "../../../../_types/header";

const Lights = ({ lightsTop }: LightsProps) => {
    const lightsDrawn = useRef<boolean>(false);
    const canvasRef = useRef<any>(null);
    const canvasContRef = useRef<any>(null);

    useEffect(() => {
        if (lightsDrawn.current) return;
        lightsDrawn.current = true;

        canvasRef.current.width = canvasContRef.current.offsetWidth;
        canvasRef.current.height = canvasContRef.current.offsetHeight;

        const ctx = canvasRef.current.getContext('2d');
        const lightRadius = 5; // Radius of each light
        const numLights = (canvasRef.current.width - lightRadius * 4) / (lightRadius * 4); // Number of lights
        let currentX = 0; // Margin between lights and logo
        const lightsY = lightsTop ? 0 + lightRadius * 2
            : canvasRef.current.height - lightRadius * 2;

        let lights: Light[] = [];

        const initLights = () => {
            for (let i = 0; i < numLights; i++) {
                const x = currentX += 20;
                const y = lightsY;

                lights.push({
                    x,
                    y,
                    isOn: false,
                });
            }
        }

        const updateLights = () => {
            for (const light of lights) {
                light.isOn = !light.isOn;
            }
        }

        const drawLights = () => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            for (const light of lights) {
                ctx.beginPath();
                ctx.arc(light.x, light.y, lightRadius, 0, 2 * Math.PI);
                ctx.strokeStyle = `rgba(255, 255, 255)`;
                ctx.lineWidth = 2; // Adjust border width as needed
                ctx.stroke();
                // Draw box shadow for depth
                ctx.shadowColor = styles.black_main;
                ctx.shadowBlur = lightRadius;
                ctx.fillStyle = light.isOn ? styles.red_main : styles.blue_main;
                ctx.fill();

                // Reset shadow properties for next light
                ctx.shadowColor = 'none';
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 0;
            }
        }

        const animate = () => {
            updateLights();
            drawLights();
            setTimeout(() => {
                requestAnimationFrame(animate);
            }, 1500)
        }

        initLights();
        animate();
    }, [])

    return (
        <div
            className={styles.lights}
            ref={canvasContRef}>
            <canvas
                id="lightCanvas"
                ref={canvasRef}
            />
        </div>
    )
}

export default Lights;