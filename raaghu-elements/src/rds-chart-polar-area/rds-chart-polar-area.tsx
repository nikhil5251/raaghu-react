import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface RdsPolarAreaChartProps {
    labels: any[],
    options: any,
    dataSets: any[],
    width?: number,
    height?: number,
    chartStyle?: string,
    id: string
}

const RdsPolarAreaChart = (props: RdsPolarAreaChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart<"polarArea", number[], unknown> | null>(null);
    const CanvasId = props.id;
    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d");

        if (ctx) {
            const ploarCanvas = new Chart(ctx, {
                type: "polarArea",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets,
                },
                options: props.options,
            });
            ploarCanvas.canvas.style.height = props.height + "px";
            ploarCanvas.canvas.style.width = props.width + "px";

            return () => {
                ploarCanvas.destroy();
            };
        }
    }, [props.height, props.width]);

    return (
        <div>
            <canvas id={CanvasId} ref={canvasRef} />
        </div>
    );
};

export default RdsPolarAreaChart;
