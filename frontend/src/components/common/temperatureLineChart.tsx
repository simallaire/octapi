import { useEffect, useState } from "react";
import LineChartData from "../../models/LineChartData";
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
import PopoverPopupState from "./popover";
import ReactTimeAgo from "react-time-ago";
import { ButtonGroup, ToggleButton, ToggleButtonGroup } from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface TemperatureLineChartState {
    data: LineChartData;
}
function TemperatureLineChart({data}: TemperatureLineChartState) {
    const [lastNmin, setLastNmin] = useState<number | null>(120);
    const handleLastNmin = (
        event: React.MouseEvent<HTMLElement>,
        newLastNmin: number | null,
      ) => {
        setLastNmin(newLastNmin);
      };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Last '+ +' minutes',
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
            <ToggleButtonGroup
                value={lastNmin}
                exclusive
                onChange={handleLastNmin}
                aria-label="text alignment"
                >
                <ToggleButton value="30" aria-label="30m">
                    30m
                </ToggleButton>
                <ToggleButton value="60" aria-label="60m">
                    1h
                </ToggleButton>
                <ToggleButton value="120" aria-label="120m">
                    2h
                </ToggleButton>
                <ToggleButton value="240" aria-label="240m">
                    4h
                </ToggleButton>
                </ToggleButtonGroup>
                <Line style={{"width": "100%"}} options={options} data={data}></Line>
            </Card.Body>
            <PopoverPopupState component={<Line style={{"width": "100%"}} options={options} data={data}></Line>} />
        </Card>
    )

}

export default TemperatureLineChart;