import { useState, useEffect } from 'react'
import { GCodeViewer, CameraInitialPosition, FloorProps } from 'react-gcode-viewer';
import { File } from '../models/Files';
import utilitiesService from '../services/utilities.service';
import printerFileService from '../services/printerFile.service';
import LabelledSwitch from './common/switch';
import { Button, Card, CardContent, CardHeader, Divider, Paper, Table, 
         TableBody, TableCell, TableContainer, TableHead, TableRow,
         ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ViewInAr } from '@mui/icons-material';


interface FileInfoState {
    file: File | undefined;
    renderGCode: boolean;
    gCodeQuality: number;
}

function FileInfo({selectedFile, setSelectedFile, setAlertFunctions}: any){
    const defaultState : FileInfoState = {
        file: selectedFile,
        renderGCode: false,
        gCodeQuality: 1
    }
    
    const [file, setFile] = useState(defaultState.file);
    const [costPerMeter, setCostPerMeter] = useState(0.10);
    const [renderGCode, setRenderGCode] = useState(defaultState.renderGCode);
    const [gCodeQuality, setGCodeQuality] = useState(defaultState.gCodeQuality);

    const secondsToHours = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const remainderSeconds = seconds % 3600;
        const minutes = Math.floor(remainderSeconds / 60);
        const secondsRemainder = Math.floor(remainderSeconds % 60);
        return `${hours}h ${minutes}m ${secondsRemainder}s`;
    }
    const handleGCodeSwitch = () => {
        setRenderGCode(!renderGCode);
    }
    const handleGCodeQualityChange = (event: any) => {
        setGCodeQuality(event.target.value/ 100.0);
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

        width: '100%',
        height: '30vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',

   
    }
    const floorProps: FloorProps = {
        gridWidth: 235,
        gridLength: 235,
    }
    const initCameraPosition : CameraInitialPosition = {
        latitude: Math.PI / 4,
        longitude: -Math.PI / 4,
        distance: 100
    }
    if (selectedFile){
    return (
        <>
        <Card>
            <CardHeader title={<span className='text-break'>{file?.display}</span>} subheader={"Uploaded: " + utilitiesService.secondsToHumanReadable(file?.date || 0)}></CardHeader>
                <LabelledSwitch type="switch"  name="autoconnect" label={<ViewInAr/>} onChange={handleGCodeSwitch}/>
                <ToggleButtonGroup
                    value={gCodeQuality}
                    exclusive
                    size="small"
                    onChange={handleGCodeQualityChange}
                    defaultValue={100}
                >
                    <ToggleButton value={25} key={25} aria-label="quality">25</ToggleButton>
                    <ToggleButton value={50} key={50} aria-label="quality">50</ToggleButton>
                    <ToggleButton value={75} key={75} aria-label="quality">75</ToggleButton>
                    <ToggleButton value={100} key={100} aria-label="quality">100</ToggleButton>
                </ToggleButtonGroup>
                {renderGCode == true && (
                <CardContent>
                    <GCodeViewer 
                        url={(file?.refs.resource.replace("api", "downloads") || "") + "?apikey=" + import.meta.env.VITE_API_KEY}
                        orbitControls
                        cameraInitialPosition={initCameraPosition}
                        showAxes
                        floorProps={floorProps}
                        style={gcodeviewerStyle}
                        quality={gCodeQuality}
                        /> 
                </CardContent>
                )}
                <CardContent>
                <div className="mb-3"> 
                    <label className='form-label fw-bold' htmlFor="printTime">Estimated print time</label>
                    <div id="printTime" className='form-text'>{selectedFile ? secondsToHours(selectedFile.gcodeAnalysis.estimatedPrintTime || 0): ""}</div>
                </div>
                <div className="fw-bold">Dimensions</div>
                <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Width</TableCell>
                            <TableCell>Depth</TableCell>
                            <TableCell>Height</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            
                            <TableCell>{selectedFile.gcodeAnalysis.dimensions.width.toFixed(1)} mm</TableCell>
                            <TableCell>{selectedFile.gcodeAnalysis.dimensions.depth.toFixed(1)} mm</TableCell>
                            <TableCell>{selectedFile.gcodeAnalysis.dimensions.height.toFixed(1)} mm</TableCell>
                        </TableRow>
                        </TableBody>
                </Table>
                </TableContainer>
                <Divider light/>

                <div className="fw-bold">Filament</div> 
                <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Length</TableCell>
                            <TableCell>Volume</TableCell>
                            <TableCell>Estimated cost <code>@{costPerMeter}$/m</code> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{(selectedFile.gcodeAnalysis.filament.tool0.length / 1000).toFixed(2)} m</TableCell>
                            <TableCell>{(Math.PI * Math.pow(1.75, 2) * selectedFile.gcodeAnalysis.filament.tool0.length/1000).toFixed(2)} cm3</TableCell>
                            <TableCell>{(selectedFile.gcodeAnalysis.filament.tool0.length / (1000/costPerMeter)).toFixed(2)} $</TableCell>
                        </TableRow>
        
                    </TableBody>
                </Table>
                </TableContainer>
                <Divider light/>

                <Button fullWidth={true} color="primary" onClick={handlePrint}>Print</Button>
                </CardContent>
            </Card>
        </>
    )
    }else{

    return(
        <Card>
            <CardContent>
                <Button disabled>Select a File in the list to view its details.</Button>

            </CardContent>
        </Card>
    )
    }
}

export default FileInfo;
