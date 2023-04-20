
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Connection from "../models/Connection";
import PrinterConnectionService from "../services/printerConnection.service";
import { Button, CloseButton, Form, FormSelect } from "react-bootstrap";
import { Input } from '@mui/material';
import printerInfoService from "../services/printerInfo.service";
import NumericInput from 'react-numeric-input';
import editIcon from '../assets/edit.png'
import React from "react";
import EditIcon from '@mui/icons-material/Edit';

interface TemperatureFormState {
    toolname: string | null;
    editing: boolean;
    temperature: number;
    targetTemperature: number;
    inputVisibility: string
    editVisibility: string

}

function TemperatureForm({temp, setTemp, tool}: any) {
    const defaultTemperatureState : TemperatureFormState = {
        toolname: tool,
        editing: false,
        temperature: temp,
        targetTemperature: temp,
        inputVisibility: "hidden",
        editVisibility: "visible"

    }
    const [editing, setEditing] = useState(defaultTemperatureState.editing);
    const [temperature, setTemperature] = useState(defaultTemperatureState.temperature);
    const [toolname, setToolname] = useState(defaultTemperatureState.toolname);
    const [targetTemperature, setTargetTemperature] = useState(defaultTemperatureState.targetTemperature);
    const [inputVisibility, setInputVisibility] = useState(defaultTemperatureState.inputVisibility);
    const [editVisibility, setEditVisibility] = useState(defaultTemperatureState.editVisibility);
    const tempInputRef = React.createRef()
    
    useEffect(() => {
        setTargetTemperature(temp);
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setTemperature(temp);
            setToolname(tool);
        }, 1000);

    });

    const handleEdit = (e: any) => {
        setEditing(true);
        setInputVisibility("visible");
        setEditVisibility("hidden");
        e.target.focus()
        if(tempInputRef.current) console.log(tempInputRef)
    };

    const handleSave = (value:number) => {
        setEditing(false);
        setInputVisibility("hidden");
        setEditVisibility("visible");
        printerInfoService.setTargetTemperature(value, toolname || "bed")
        setTargetTemperature(value);
    };

    const handleCancel = () => {
        setEditing(false);
        setInputVisibility("hidden");
        setEditVisibility("visible");
        setEditing(false);
    };
    const onKeyDown = (event: any) => {
        if (event.key === "Enter") {
            handleSave(targetTemperature);
        }
        if (event.key === "Escape") {
            handleCancel();
        }
      }


        return (
            <>         
                { inputVisibility === "hidden" && (       
                <div onClick={handleEdit} style={{"position":"relative", display: "", "minWidth":"10rem", paddingLeft: "10%"}}>
                <span onClick={handleEdit}>{temperature} °C</span>
                <EditIcon className="ms-auto"  style={{"height": "20px", "paddingLeft":"10px"}} onClick={handleEdit}/>
                </div>
                )}
                { inputVisibility === "visible" && (
                <div style={{"visibility": inputVisibility}}>
                    <NumericInput 
                        className="form-control"
                        min={0} 
                        max={toolname === "bed" ? 100: 250} 
                        onKeyDown={onKeyDown} 
                        type="number" 
                        value={targetTemperature} 
                        onChange={e => {
                            return setTargetTemperature(e || 0);
                        }} />
                    {/* <CloseButton onClick={handleCancel} /> */}
                </div>
                )}
            </>
        )
}

export default TemperatureForm;