
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Connection from "../models/Connection";
import PrinterConnectionService from "../services/printerConnection.service";
import { Button, Form, FormSelect, Table } from "react-bootstrap";
import TemperatureState from "../models/Temperature";
import printerInfoService from "../services/printerInfo.service";
import TemperatureForm from "./temperatureForm";

interface PrinterTemperatureState {
    temperature: TemperatureState | undefined,
    toolTarget: number,
    bedTarget: number

}

const InlineEdit = ({ value, setValue }) => {
    const [editingValue, setEditingValue] = useState(value);
    
    const onChange = (event) => setEditingValue(event.target.value);
    
    const onKeyDown = (event) => {
      if (event.key === "Enter" || event.key === "Escape") {
        event.target.blur();
      }
    }
    
    const onBlur = (event) => {
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Extruder</th>
                        <th>Bed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Actual</td>
                        <td>
                            {temperature?.tool0.actual} °C
                        </td>
                        <td>
                            {temperature?.bed.actual} °C
                        </td>
                    </tr>
                    <tr>
                        <td>Target</td>
                        <td>
                            <TemperatureForm temp={toolTarget} setTemp={setToolTarget} tool="tool0" />
                        </td>
                        <td>
                            <TemperatureForm temp={bedTarget} setTemp={setBedTarget} tool="bed" />
                        </td>
                    </tr>
                </tbody>
            </Table>
    )
}

export default PrinterTemperature;