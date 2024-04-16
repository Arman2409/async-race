import { useEffect, useRef } from "react";

import styles from "../../../../_styles/components/Header/components/Lights.module.scss";
import { HEADER_LIGHTS_RADIUS } from "../../../../_configs/components";
import type { Light, LightProps } from "../../../../_types/components/header";

const Lights = ({ position }: LightProps) => {
    const lightsDrawn = useRef<boolean>(false);

    useEffect(() => {
        if (lightsDrawn.current) return;
        lightsDrawn.current = true;
        const canvasEl = document.querySelector(`#lights_canvas_${position}`) as HTMLCanvasElement
        const canvasCont = document.querySelector(`#canvas_cont_${position}`) as HTMLElement;
        canvasEl?.setAttribute("width", String(canvasCont.offsetWidth));
        canvasEl?.setAttribute("height", String(canvasCont.offsetHeight));;
        const ctx = canvasEl.getContext('2d');
        const lightRadius = HEADER_LIGHTS_RADIUS; // Radius of each light
        const numLights = Math.floor((canvasEl.width - lightRadius * 4) / (lightRadius * 4)); // Number of lights
        let currentX = 0;
        const lightsY = canvasEl.height * 0.5;

        let lights: Light[] = [];

        const initLights = () => {
            for (let i = 0; i < numLights; i++) {
                const x = currentX += 20;

                lights.push({
                    x,
                    y: lightsY,
                    color: "red",
                });
            }
        }

        const updateLights = () => {
            for (const light of lights) {
                light.color = light.color === "red" ? "blue" : "red";
            }
        }

        const drawLights = () => {
            if (ctx) {
                ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

                for (const light of lights) {

                    ctx.beginPath();
                    ctx.arc(light.x, light.y, lightRadius, 0, 2 * Math.PI);
                    ctx.strokeStyle = `rgba(255, 255, 255)`;
                    ctx.lineWidth = 2; // Adjust border width as needed
                    ctx.stroke();
                    // Draw box shadow for depth
                    ctx.shadowColor = styles.black_main;
                    ctx.shadowBlur = lightRadius;
                    ctx.fillStyle = light.color === "red" ? styles.red_main : styles.blue_main;
                    ctx.fill();

                    // Reset shadow properties for next light
                    ctx.shadowColor = 'none';
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.shadowBlur = 0;
                }
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
            id={`canvas_cont_${position}`}
            className={styles.lights}
        >
            <canvas
                id={`lights_canvas_${position}`}
            />
        </div>
    )
}

export default Lights;