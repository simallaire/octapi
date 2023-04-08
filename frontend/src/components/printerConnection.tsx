
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Connection from "../models/Connection";
import PrinterConnectionService from "../services/printerConnection.service";
import { Button, Form, FormSelect } from "react-bootstrap";


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
    const handleFormDisplay = (e) => {
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
        <Card border={isConnected? "success" : "warning"}>
            <Form.Check reverse={true} type="switch" className='form form-text' name="showForm" label="Show Connection Form" onChange={handleFormDisplay}/>
            <Card.Header as="h5">Connection State</Card.Header>
            <Card.Body >
                <Card.Text >
                    <div>
                        <span className={isConnected? "greendot" : "reddot"}></span>
                            {isConnected ? connectionState?.options?.printerProfiles[0]?.name +" Connected" : "Disconnected"}
                    </div>
                    <Form style={{"display": showForm?"inline":"none"}}>
                        <Form.Select  disabled={isConnected} value={port} onChange={e => {setPort(e.target.value)}}>
                            {connectionState?.options?.ports?.map((path) => (
                                <option key={path}>{path}</option>
                            ))}
                        </Form.Select>
                        <Form.Select disabled={isConnected} value={baudRate} onChange={e => {setBaudRate(e.target.value)}}>
                            {connectionState?.options?.baudrates?.map((baudrate) => (
                                <option key={baudrate}>{baudrate}</option>
                            ))}
                        </Form.Select>
                        <Form.Check type="switch" name="autoconnect" label="Auto-Connect" disabled={isConnected} value={autoconnect}/>
                        <br/>
                        <Button className="btn btn-primary form-control" disabled={isConnected} onClick={handleConnect}>Connect</Button>
                        <Button className="btn btn-secondary form-control" disabled={!isConnected} onClick={() => PrinterConnectionService.disconnect()}>Disconnect</Button>
                    </Form>
                </Card.Text>
            </Card.Body>
        </Card>
    )

    }


export default PrinterConnection;