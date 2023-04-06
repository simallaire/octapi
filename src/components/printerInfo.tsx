
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import PrinterInfoService from "../services/printerInfo.service"
import PrinterState from "../models/PrinterState";
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
import { Line } from 'react-chartjs-2';

import axios from "axios";
import PrinterTemperature from "./printerTemperature";
import TemperatureHistory from "../models/TemperatureHistory";
import ASpinner from "./common/aSpinner";
import faker from "faker";
import LineChartData from "../models/LineChartData";
import utilitiesService from "../services/utilities.service";


interface PrinterInfoState {
    name: String | null,
    printerState: PrinterState | undefined,
    error: String | null,
    temperatureHistory: TemperatureHistory[] | undefined
    lineChartData: LineChartData | undefined;

}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

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


function PrinterInfo(){

    const defaultState : PrinterInfoState = {
        name: null,
        printerState: undefined,
        error: null,
        temperatureHistory: undefined,
        lineChartData: undefined
    }

    const [printerState, setPrinterState] = useState(defaultState.printerState);
    const [error, setError] = useState(defaultState.error);
    const [temperatureHistory, setTemperatureHistory] = useState(defaultState.temperatureHistory);
    const [lineChartData, setLineChartData] = useState(defaultState.lineChartData);
    const fetchState = async () => {
            const responseState = await PrinterInfoService.getState()

            if (responseState === false) {
                setError("Not operational");
            }else{
                setPrinterState(responseState);
                setError(responseState.error);
            }
    }
    const fetchHistory = async () => {
        const responseHistory = await PrinterInfoService.getTemperatureHistory()

        if (responseHistory === false) {
            setError("Not operational");
        }else{
            setTemperatureHistory(responseHistory);
        }
    }
    const makeChartData = () => {
        let toolCurrent = [] 
        let toolTarget = []
        let bedCurrent = []
        let bedTarget = []
        let x = []

        if (temperatureHistory !== undefined) {
            
            for (let i = 0; i < temperatureHistory.length; i++) {
                x.push(utilitiesService.secondsToHourMin(temperatureHistory[i].time));
                toolCurrent.push(temperatureHistory[i].tool0.actual || 0);
                toolTarget.push(temperatureHistory[i].tool0.target || 0);
                bedCurrent.push(temperatureHistory[i].bed.actual || 0);
                bedTarget.push(temperatureHistory[i].bed.target || 0);

            }
        }
        return {
            labels: x || [0],
            datasets: [
                {
                label: 'Tool Actual',
                data: toolCurrent || [0],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                label: 'Tool Target',
                data: toolTarget || [0],
                borderColor: 'rgb(255, 188, 189)',
                backgroundColor: 'rgba(255, 188, 189, 0.5)',
                },
                {
                label: 'Bed Actual',
                data: bedCurrent || [0],
                borderColor: 'rgb(53, 162, 255)',
                backgroundColor: 'rgba(53, 162, 255, 0.5)',
                },
                {
                label: 'Bed Target',
                data: bedTarget || [0],
                borderColor: 'rgb(100, 162, 255)',
                backgroundColor: 'rgba(100, 162, 255, 0.5)',
                },
            ],
        }

        

        }
    useEffect(() => {
        fetchState();
        fetchHistory();
        setLineChartData(makeChartData);
        
    }, []);
    useEffect(() => {
        
    }, [temperatureHistory]);
    useEffect(() => {
        
        setTimeout(() => {
            fetchState();
            fetchHistory();
            setLineChartData(makeChartData)

            // console.log(printerState);
        }, 10000);

    })
    if(error === "") {
        return (
            <>

            <Card border="info">

            { printerState && (
                <>
                <Card.Header>Printer State: { printerState.flags?.printing? "Printing" : "Not Printing" }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <>
                        State: { printerState.text }
                        </>
                    </Card.Text>
                    <Card.Text>
                        <PrinterTemperature />
                    </Card.Text>
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
                </>
                )}
            </Card>
            { lineChartData?.datasets && (
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Temperature History</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Line style={{"width": "100%"}} options={options} data={lineChartData}></Line>
                    </Card.Body>
                </Card>

            )}
            </>
        )
            }
    else 
        {
            return (
                <Card border="danger" style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title>Error</Card.Title>
                        <Card.Text>
                            <ASpinner />
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        }
}


export default PrinterInfo;