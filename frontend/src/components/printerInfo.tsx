
import React, { Attributes, Component, useEffect, useState } from "react";
// import { Card } from '@mui/material'
import PrinterInfoService from "../services/printerInfo.service"
import PrinterState from "../models/PrinterState";
import PrinterTemperature from "./printerTemperature";
import TemperatureHistory from "../models/TemperatureHistory";
import ASpinner from "./common/aSpinner";
import LineChartData from "../models/LineChartData";
import UtilitiesService from "../services/utilities.service";
import printerFileService from "../services/printerFile.service";
import axios from "axios";
import { IPrinterTemperature } from "../models/PrinterTemperature";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Box, Button, Card, CardContent, CardHeader, Chip, Collapse, LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import printerJobService from "../services/printerJob.service";
import LinearProgressWithLabel from "./common/linearProgressWithLabel";

interface PrinterInfoState {
    name: String | null,
    printerState: PrinterState | undefined,
    error: String | null,
    temperatureHistoryDB: IPrinterTemperature[] | undefined,
    lineChartData: LineChartData | undefined,
    apexState: any | undefined,
    apexChart: ReactApexChart | any,
    progress: number
    

}


    let apexCharEle: any;



function PrinterInfo({setIsPrinting, isPrinting, setAlertFunctions}: any){

    const defaultState : PrinterInfoState = {
        name: null,
        printerState: undefined,
        error: null,
        temperatureHistoryDB: undefined,
        lineChartData: undefined,
        apexState: undefined,
        apexChart: {},
        progress: 0
    }

    const [printerState, setPrinterState] = useState(defaultState.printerState);
    const [error, setError] = useState(defaultState.error);
    const [lineChartData, setLineChartData] = useState(defaultState.lineChartData);
    const [temperatureHistoryDB, setTemperatureHistoryDB] = useState(defaultState.temperatureHistoryDB);
    const [apexState, setApexState] = useState(defaultState.apexState);
    const [apexChart, setApexChart] = useState(defaultState.apexChart);
    const [progress, setProgress] = useState(defaultState.progress);
    

      
    const fetchState = async () => {
            const responseState = await PrinterInfoService.getState()

            if (responseState === false) {
                setError("Not operational");
            }else{
                setPrinterState(responseState);
                setError(responseState.error);
            }
    }
    const fetchHistoryDB = async (n: number) => {
        const responseHistoryDB = await PrinterInfoService.getLastN_DB(n as unknown as string)

        if (responseHistoryDB === false) {
            setError("Not operational");
        }else{
            // console.log(responseHistoryDB);
            setTemperatureHistoryDB(responseHistoryDB);
        }
    }
    const fetchProgress = async () => {
        const responseProgress = await printerJobService.getJobProgress()

        if (responseProgress === false) {
            setError("Not operational");
        }else{
            setProgress(responseProgress.progress.completion);
        }
    }
    const fetchLastOne = async () => {
        const responseLastOne = await PrinterInfoService.getLastN_DB("1")

        if (responseLastOne === false) {
            setError("Not operational");
        }else{
            // console.log(responseLastOne);
            let tempTempHistoryDB = temperatureHistoryDB
            tempTempHistoryDB?.shift()
            tempTempHistoryDB?.push(responseLastOne[0]);
            setTemperatureHistoryDB(tempTempHistoryDB);
        }
    }

    const handleCancel = () => {
        setIsPrinting(false)
        setAlertFunctions.setAlertMessage("Print canceled")
        setAlertFunctions.setAlertVariant("warning")
        setAlertFunctions.setAlertShow(true)
        printerFileService.cancelPrint()
        setTimeout(() => {
            fetchState()
        }, 2000)

    }
    const makeChartDataDBApex = () => {
        let toolActual = [] 
        let toolTarget = []
        let bedActual = []
        let bedTarget = []
        let x = []

       
        if (temperatureHistoryDB!== undefined) {
            for (let i = 0; i < temperatureHistoryDB.length-3; i+=3) {
                const tempDate = new Date(temperatureHistoryDB[i].date)
                const getTime = tempDate.getTime()
                x.push(tempDate);
                toolActual.push([getTime, temperatureHistoryDB[i].toolActual]);
                toolTarget.push([getTime, temperatureHistoryDB[i].toolTarget || 0]);
                bedActual.push([getTime, temperatureHistoryDB[i].bedActual || 0]);
                bedTarget.push([getTime, temperatureHistoryDB[i].bedTarget || 0]);

            }
        }
        const state = {
          
            series: [{
                name: 'Tool',
                data: toolActual
            },
            {
                name: 'Tool Target',
                data: toolTarget
            },
            {
                name: 'Bed',
                data: bedActual
            },
            {
                name: 'Bed Target',
                data: bedTarget
            }],
            options: {
              chart: {
                type: 'line',
                stacked: false,
                height: 350,
                zoom: {
                  type: 'x',
                  enabled: true,
                  autoScaleYaxis: true
                },
                toolbar: {
                  autoSelected: 'zoom'
                }
              },
              dataLabels: {
                enabled: false
              },
              markers: {
                size: 0,
              },
              title: {
                text: 'Last 2h temperatures',
                align: 'center'
              },
            //   fill: {
            //     type: 'gradient',
            //     gradient: {
            //       shadeIntensity: 1,
            //       inverseColors: false,
            //       opacityFrom: 0.5,
            //       opacityTo: 0.5,
            //       stops: [0, 90, 100]
            //     },
            //   },
              yaxis: {
                title: {
                  text: 'Temperature (°C)'
                },
              },
              xaxis: {
                type: 'datetime',
                title: {
                  text: 'Date'
                },
                labels: {
                    datetimeUTC: false
                }


              },
              tooltip: {
                shared: false,
              }
            },
          
          
          };
          return state;
        }
    const makeChartDataDB = () => {
        let toolActual = [] 
        let toolTarget = []
        let bedActual = []
        let bedTarget = []
        let x = []

       
        if (temperatureHistoryDB!== undefined) {
            for (let i = 0; i < temperatureHistoryDB.length-3; i+=3) {
                const tempDate = new Date(temperatureHistoryDB[i].date)
                x.push(tempDate.toLocaleTimeString());
                toolActual.push(temperatureHistoryDB[i].toolActual || 0);
                toolTarget.push(temperatureHistoryDB[i].toolTarget || 0);
                bedActual.push(temperatureHistoryDB[i].bedActual || 0);
                bedTarget.push(temperatureHistoryDB[i].bedTarget || 0);

            }
        }
        // console.log(toolActual.length);
        if (toolActual.length == 0) 
            console.log(temperatureHistoryDB)
        return {
            labels: x || [0],
            datasets: [
                {
                label: 'Tool Actual',
                data: toolActual || [0],
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
                data: bedActual || [0],
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
        // fetchHistory();
        // setApexChart(new ReactApexChart(docume), apexState))/;
        fetchHistoryDB(12*60);
        fetchProgress();
        setLineChartData(makeChartDataDB);
        setApexState(makeChartDataDBApex);
        setIsPrinting(printerState?.flags?.printing);
        if (apexState?.series.length > 0) {
        setApexChart(React.createElement(ReactApexChart,
             { 
                type: "line",
                series: apexState.series,
                options: apexState.options 
            })
        )
        }
        // setApexChart(new ApexCharts(document.getElementById("chartdiv"), apexState));

        
    }, []);
    useEffect(() => {
        console.log("changed chart data")
    }, [temperatureHistoryDB]);
    useEffect(() => {
        
        setTimeout(() => {
            fetchState();
            // fetchHistory();
            fetchLastOne();
            if (temperatureHistoryDB!== undefined) {
                setLineChartData(makeChartDataDB)
                setApexState(makeChartDataDBApex)
            }
            setIsPrinting(printerState?.flags?.printing);
            fetchProgress();
            console.log(apexCharEle)
        }, 5000);
        

    })
    if(error === "") {


        return (
            <>

                <Card>

                { printerState && (
                    <>
                    <CardHeader title={printerState.flags?.printing? <Chip color="warning" label="Printing"/> :  <Chip variant="outlined" color="success" label="Not Printing"/>}></CardHeader>

                    <CardContent>
                        <div>
                            <>
                                Target state: { printerState.text }    
                                <Collapse in={printerState.text === "Printing"}>               
                                    <CardContent>
                                        <LinearProgressWithLabel value={progress} />
                                    </CardContent>
                                </Collapse> 
                            </>
                       
                            <div>
                                <Button disabled={!printerState.flags?.printing} fullWidth={true} color="secondary" className="" type="submit" onClick={handleCancel}>Cancel Print</Button>
                            </div>
                        </div>
                        <div >
                            <PrinterTemperature />
                        </div>
                    </CardContent>

                    </>
                    )}

                </Card>
                { apexState.series[0].data && <Card><ReactApexChart  id="apexChart" options={apexState.options} series={apexState.series} type="line" height={350} /></Card> }

            </>
        )
            }
    else 
        {
            return (
                <Card style={{ width: '30rem' }}>
                    <CardContent>
                        <CardHeader>Loading</CardHeader>
                        <div>
                            <ASpinner />
                        </div>
                    </CardContent>
                </Card>
            )
        }
}


export default PrinterInfo;