import { useEffect, useState } from "react";
import Connection from "../models/Connection";
import { Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Paper, Select, styled } from "@mui/material";
import PrinterConnectionService from "../services/printerConnection.service";
import LabelledSwitch from "./common/switch";


interface PrinterConnectionState {
    connectionState: Connection | undefined,
    isConnected: boolean,
    port: string,
    baudRate: number,
    autoconnect: boolean,
    showForm: boolean

}

function PrinterConnection(){

    const defaultState : PrinterConnectionState = {
        connectionState: undefined,
        isConnected: false,
        port: "/dev/ttyUSB0",
        baudRate: 115200,
        autoconnect: true,
        showForm: true

    }

    const [connectionState, setConnectionState] = useState(defaultState.connectionState)
    const [isConnected, setIsConnected] = useState(defaultState.isConnected)
    const [port, setPort] = useState(defaultState.port)
    const [baudRate, setBaudRate] = useState(defaultState.baudRate)
    const [autoconnect, setAutoconnect] = useState(defaultState.autoconnect)
    const [showForm, setShowForm] = useState(defaultState.showForm)


    const fetchState = async () => {
            setConnectionState(await PrinterConnectionService.getConnection());
            setPort(connectionState?.current?.port || port)
            setBaudRate(connectionState?.current?.baudrate || baudRate)
            setAutoconnect(connectionState?.options?.autoconnect || autoconnect)
    }
    const handleConnect = async () => {
        await PrinterConnectionService.connect(port, baudRate, autoconnect);
        fetchState();
    }
    const handleFormDisplay = (e: any) => {
        setShowForm(e.target.checked);
    }
    useEffect(() => {
        
        setTimeout(() => {
            fetchState();
            if(connectionState?.current?.state == "Operational" || connectionState?.current?.state == "Printing"){
                if(!isConnected)
                    setShowForm(false);
                setIsConnected(true);
            }else{
                if(isConnected)
                    setShowForm(true);
                setIsConnected(false);
            }
        }, 1000);
        

        // console.log(connectionState?.current);
        // console.log(connectionState?.options);
        
    })
    return (
        <Card>
            {/* <Form.Check reverse={true} type="switch" className='form form-text' name="showForm" label="Show Connection Form" onChange={handleFormDisplay}/> */}
            <CardHeader title={"Connection State"}></CardHeader>
            <LabelledSwitch checked={showForm} onChange={handleFormDisplay} label="Show connection form" />
            <CardContent>
                    <div>
                        <span className={isConnected? "greendot" : "reddot"}></span>
                            {isConnected ? connectionState?.options?.printerProfiles[0]?.name +" Connected" : "Disconnected"}
                    </div>
                    <div style={{"display": showForm?"inline":"none"}} >
                        <FormControl fullWidth>
                        <InputLabel id="device-path-label">Device Path</InputLabel>
                        <Select
                            labelId="device-path-label"
                            id="demo-simple-select"
                            value={port}
                            disabled={isConnected}
                            label="Device path"
                            onChange={e => {setPort(e.target.value)}}
                        >
                            {connectionState?.options?.ports?.map((path) => (
                            <MenuItem key={path} value={path}>{path}</MenuItem>
                            ))}

                        </Select>
                        </FormControl>
                        <FormControl fullWidth>
                        <InputLabel id="device-baudrate-label">Baudrate</InputLabel>
                        <Select
                            labelId="device-baudrate-label"
                            id="demo-simple-select"
                            value={baudRate}
                            disabled={isConnected}
                            label="baudrate"
                            onChange={e => {setBaudRate(parseInt(e.target.value as string))}}
                        >
                            {connectionState?.options?.baudrates?.map((baudrate) => (
                            <MenuItem key={baudrate} value={baudrate}>{baudrate}</MenuItem>
                            ))}

                        </Select>
                        </FormControl>
                        <LabelledSwitch onChange={null} name="autoconnect" label="Auto-Connect" disabled={isConnected} checked={autoconnect}/>
                        <br/>
                        </div>
                        <Button fullWidth={true}  disabled={isConnected} onClick={handleConnect}>Connect</Button>
                        <Button fullWidth={true} disabled={!isConnected} onClick={() => PrinterConnectionService.disconnect()}>Disconnect</Button>
                                
            </CardContent>
        </Card>

    )

    }


export default PrinterConnection;