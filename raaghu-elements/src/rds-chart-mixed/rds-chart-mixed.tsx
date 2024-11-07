import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface RdsMixedChartProps {
    labels: any[],
    options: any,
    dataSets: any[],
    width?: number,
    height?: number
    chartStyle: string,
    id: string
}

const RdsMixedChart = (props: RdsMixedChartProps) => {
    
const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d") as CanvasRenderingContext2D;

        if (ctx) {
            const mixedCanvas = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets,
                },
                options: props.options,
            });

            return () => {
                mixedCanvas.destroy();
            };
        }
    }, [props.height, props.width]);

    return (
        <div>
            <canvas data-testid={props.id} id={props.id} ref={canvasRef} />
        </div>
    );
    };

export default RdsMixedChart;
