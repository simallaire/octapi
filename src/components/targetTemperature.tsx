
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

interface TargetTemperatureState {
    toolname: string | null;
    editing: boolean;
    temperature: number;
    targetTemperature: number;
    inputVisibility: string
    editVisibility: string

}

function TargetTemperature({temp, setTemp, tool}) {
    const defaultTemperatureState : TargetTemperatureState = {
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

    const handleEdit = () => {
        setEditing(true);
        setInputVisibility("visible");
        setEditVisibility("hidden");
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
    const onKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSave(targetTemperature);
        }
        if (event.key === "Escape") {
            handleCancel();
        }
      }


        return (
            <>                
                <div onClick={handleEdit} style={{"visibility": editVisibility, "position":"absolute", "min-width":"10rem", "border-size": "1px"}}>
                <span onClick={handleEdit}>{temperature} °C</span>
                {/* <Button className="btn btn-secondary" onClick={handleEdit}>Edit</Button> */}
                <img className="ms-auto"  style={{"height": "20px", "paddingLeft":"10px"}} onClick={handleEdit} src={editIcon}/>
                </div>
                <div style={{"visibility": inputVisibility}}>
                    <NumericInput className="form-control" style={{"width": "8rem"}} min={0} max={toolname === "bed" ? 100: 250} onKeyDown={onKeyDown} type="number" value={targetTemperature} onChange={e => setTargetTemperature(e)} />
                    {/* <CloseButton onClick={handleCancel} /> */}
                </div>

            </>
        )
}

export default TargetTemperature;