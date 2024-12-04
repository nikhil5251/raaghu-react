import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export interface RdsBarChartProps {
    labels: any[];
    options: any;
    dataSets: any[];
    id: any;
}

const RdsBarChart = (props: RdsBarChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const CanvasId = props.id;

    useEffect(() => {
        const canvasElm = canvasRef.current;
        const ctx = canvasElm?.getContext("2d");

        if (ctx) {
            const barCanvas = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: props.labels,
                    datasets: props.dataSets
                },
                options: props.options,
            });

            barCanvas.canvas.style.height = "60vh";
            barCanvas.canvas.style.width = "100vh";
        
            return () => {
                barCanvas.destroy();
            };
        }
    }, []);
    
    return (
        <div>
            <canvas data-testid={CanvasId} id={CanvasId} ref={canvasRef} />
        </div>
    );
};

export default RdsBarChart;
