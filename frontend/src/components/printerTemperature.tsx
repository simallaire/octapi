
import { useEffect, useState } from "react";
import TemperatureState from "../models/Temperature";
import printerInfoService from "../services/printerInfo.service";
import TemperatureForm from "./temperatureForm";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

interface PrinterTemperatureState {
    temperature: TemperatureState | undefined,
    toolTarget: number,
    bedTarget: number

}

const InlineEdit = ({ value, setValue }: any) => {
    const [editingValue, setEditingValue] = useState(value);
    
    const onChange = (event: any) => setEditingValue(event.target.value);
    
    const onKeyDown = (event: any) => {
      if (event.key === "Enter" || event.key === "Escape") {
        event.target.blur();
      }
    }
    
    const onBlur = (event: any) => {
      if (event.target.value.trim() === "") {
        setEditingValue(value);
      } else {
        setValue(event.target.value)
      }
    }
  
    return (
      <input
        type="number"
        aria-label="Target temperature"
        value={editingValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    );
  };

function PrinterTemperature(){
    const defaultTemperature : PrinterTemperatureState = {
        temperature: undefined,
        toolTarget: 0,
        bedTarget: 0
    }
    const [temperature, setTemperature] = useState(defaultTemperature.temperature);
    const [toolTarget, setToolTarget] = useState(defaultTemperature.toolTarget);
    const [bedTarget, setBedTarget] = useState(defaultTemperature.bedTarget);

    const fetchTemperature = async () => {
        const temperature = await printerInfoService.getTemperature();
        if (temperature !== false) {
            setTemperature(temperature);
            setToolTarget(temperature.tool0.target);
            setBedTarget(temperature.bed.target);
        }
    }
    useEffect(() => {
        setTimeout( () => {
            fetchTemperature();
        }, 1000);
    })

    return (
        <>
            <TableContainer component={Paper}>

            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Extruder</TableCell>
                        <TableCell>Bed</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Actual</TableCell>
                        <TableCell>
                            {temperature?.tool0.actual} °C
                        </TableCell>
                        <TableCell>
                            {temperature?.bed.actual} °C
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Target</TableCell>
                        <TableCell>
                            <TemperatureForm temp={toolTarget} setTemp={setToolTarget} tool="tool0" />
                        </TableCell>
                        <TableCell>
                            <TemperatureForm temp={bedTarget} setTemp={setBedTarget} tool="bed" />
                        </TableCell>
                    </TableRow>
                </TableBody>
             </Table>
            </TableContainer>
        </>
    )
}

export default PrinterTemperature;