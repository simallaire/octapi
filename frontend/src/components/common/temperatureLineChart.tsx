import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function TemperatureLineChart({data}){

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Last 30 minutes',
            }
        },
        scales: {
            x: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }
        }
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">Temperature History</Card.Title>
            </Card.Header>
            <Card.Body>
                <Line style={{"width": "100%"}} options={options} data={data}></Line>
            </Card.Body>
        </Card>
    )

}

export default TemperatureLineChart;