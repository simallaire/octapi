import { useState, useEffect } from 'react'
import { Button, Card, Form, Table } from 'react-bootstrap';
import { GCodeViewer, CameraInitialPosition } from 'react-gcode-viewer';
import { File } from '../models/Files';
import utilitiesService from '../services/utilities.service';
import printerFileService from '../services/printerFile.service';


interface FileInfoState {
    file: File | undefined;
    renderGCode: boolean;
}

function FileInfo({selectedFile, setSelectedFile, setAlertFunctions}){
    const defaultState : FileInfoState = {
        file: selectedFile,
        renderGCode: false
    }
    const [file, setFile] = useState(defaultState.file);
    const [costPerMeter, setCostPerMeter] = useState(0.10);
    const [renderGCode, setRenderGCode] = useState(defaultState.renderGCode);

    const secondsToHours = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const remainderSeconds = seconds % 3600;
        const minutes = Math.floor(remainderSeconds / 60);
        const secondsRemainder = Math.floor(remainderSeconds % 60);
        return `${hours}h ${minutes}m ${secondsRemainder}s`;
    }
    const handleGCodeSwitch = () => {
        setRenderGCode(!renderGCode);
    }
    const handlePrint = async () => {
        if(file !== undefined){
            const res = await printerFileService.printFile(file.path);
            if(res === true){
                setAlertFunctions.setAlertMessage('Printing successfully started!');
                setAlertFunctions.setAlertVariant('success');
                setAlertFunctions.setAlertShow(true);
                setTimeout(() => {
                    setAlertFunctions.setAlertMessage("");
                    setAlertFunctions.setAlertShow(false);
                }, 10000);
            }
            console.log(res);

        }
    }
    useEffect(() => {
        setFile(selectedFile);
        setSelectedFile(selectedFile);
    }, [selectedFile]);

    const gcodeviewerStyle = {
        top: 0,
        left: 0,
        width: '25vw',
        height: '30vh',
        position: 'relative',
        overflow: 'hidden',

   
    }
    const initCameraPosition : CameraInitialPosition = {
        latitude: Math.PI / 4,
        longitude: -Math.PI / 4,
        distance: 100
    }
    return (
        <>
        <Card.Header><span className='text-break'>{file?.display}</span></Card.Header>
            Uploaded: {utilitiesService.secondsToHumanReadable(file.date)}
            <Form className='form'>
            <Form.Check reverse type="switch" className='form form-text' name="autoconnect" label="Render GCode" onChange={handleGCodeSwitch}/>
            </Form>
            { renderGCode == true && (
            <Card.Body>
                <GCodeViewer 
                    url={file.refs.resource.replace("api", "downloads") + "?apikey=" + import.meta.env.VITE_API_KEY}
                    orbitControls
                    cameraInitialPosition={initCameraPosition}
                    showAxes
                    style={gcodeviewerStyle}
                    /> 
            </Card.Body>
            )}

            <Card.Body>
            <div className="mb-3"> 
                <label className='form-label fw-bold' for="printTime">Estimated print time</label>
                <div id="printTime" className='form-text'>{selectedFile ? secondsToHours(selectedFile.gcodeAnalysis.estimatedPrintTime): ""}</div>
            </div>
            <div className="fw-bold">Dimensions</div>
            <Table striped  hover className='form-text'>
                <thead>
                    <tr>
                        <th>Width</th>
                        <th>Depth</th>
                        <th>Height</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{selectedFile.gcodeAnalysis.dimensions.width.toFixed(1)} mm</td>
                        <td>{selectedFile.gcodeAnalysis.dimensions.depth.toFixed(1)} mm</td>
                        <td>{selectedFile.gcodeAnalysis.dimensions.height.toFixed(1)} mm</td>
                    </tr>
                    </tbody>
            </Table>
            <div className="fw-bold">Filament</div> 
            <Table striped  hover className='form-text'>
                <thead>
                    <tr>
                        <th>Length</th>
                        <th>Volume</th>
                        <th>Estimated cost <code>@{costPerMeter}$/m</code> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{(selectedFile.gcodeAnalysis.filament.tool0.length / 1000).toFixed(2)} m</td>
                        <td>{(Math.PI * Math.pow(1.75, 2) * selectedFile.gcodeAnalysis.filament.tool0.length/1000).toFixed(2)} cm3</td>
                        <td>{(selectedFile.gcodeAnalysis.filament.tool0.length / (1000/costPerMeter)).toFixed(2)} $</td>
                    </tr>
    
                </tbody>
            </Table>
            <Form className='form'>
                <Button className='form form-control' variant="primary" onClick={handlePrint}>Print</Button>
            </Form>
            </Card.Body>
        </>
    )
}

export default FileInfo;