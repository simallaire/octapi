import { Input } from "@mui/material";
import { useEffect, useState } from "react";
import { Badge, ListGroup, Placeholder, Table } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import ReactTimeAgo from "react-time-ago";
import Files, {File} from "../models/Files";
import PrinterFileService from "../services/printerFile.service";
import UtilitiesService from "../services/utilities.service";
import FileInfo from "./fileInfo";
import FuzzySearch from 'fuzzy-search';

interface PrinterFilesState {
    fileResponse: Files | undefined; 
    fileList: File[] | undefined;
    selectedFile: File | undefined;
    searchText: string;
}

function FileListItem({file, selectedFile, setSelectedFile}) {

    const [active, setActive] = useState(false);
    const [variant, setVariant] = useState();
    const [success, setSuccess] = useState(0);
    const [error, setError] = useState(0);

    const toDateTime = (secs) => {
        var t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        return t;
    }
    const handleClick = (e) => {
        // console.log(e);
        setActive(!active);
        if (!active) {
            setSelectedFile(file);
        }else{
            setSelectedFile(undefined);
        }
    }
    useEffect(() => {
        if (selectedFile && file.date === selectedFile.date) {
            setActive(true);
        }else{
            setActive(false);
        }
    }, [selectedFile])

    useEffect(() => {
        if (file.prints){
            if (file.prints.last.success === false) {
                setVariant("warning");
            }
            setSuccess(file.prints.success);
            setError(file.prints.failure);
        } 
    },[])
    
    return (
        <ListGroup.Item variant={variant} eventKey={file.date} active={active} onClick={handleClick} action as="li" className="d-flex align-items-start">
            <div className="ms-2 me-auto" style={{"width": "100%"}}>
                <div className="fw-bold">{file.display}</div>
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                <ReactTimeAgo date={toDateTime(file.date)} locale="en-US" />
                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                {UtilitiesService.bytesToHumanReadable(file.size)}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            {success > 0 && (
                <Badge bg="success" className="ms-2" pill>
                    Printed {success}
                </Badge>
            )}
            {error > 0 && (
                <Badge bg="warning" className="ms-2" pill>
                    Failed {error}
                </Badge>
            )}
        </ListGroup.Item>

    )
}


function PrinterFiles({setAlertFunctions}){

    const defaultState: PrinterFilesState = {
        fileResponse: undefined,
        fileList: undefined,
        selectedFile: undefined,
        searchText: ""
    }

    const [fileResponse, setFileResponse] = useState(defaultState.fileResponse);
    const [fileList, setFileList] = useState(defaultState.fileList);
    const [selectedFile, setSelectedFile] = useState(defaultState.selectedFile);
    const [searchText, setSearchText] = useState(defaultState.searchText);

    const fetchFiles = async () => {
        const response = await PrinterFileService.getFiles();
        setFileResponse(response);
        if (searchText === ""){
            if(response.files)
                setFileList(response.files.sort((a: File, b: File ) =>  a.date < b.date ? 1 : -1 ))
            // console.log(fileList);
        }
    }
    const registerKey = (e: any) => {
        setSearchText(e.target.value);
    }
    const handleSearch = (e: any) => {
        if (e.target.value === ""){
            setFileList(fileResponse?.files || []);
        }else{
            const searcher = new FuzzySearch(fileResponse?.files, ["display"]);
            const results = searcher.search(e.target.value);
            setFileList(results);
            console.log(results);
            console.log(searchText);
        }

    }
    useEffect(() => {
        fetchFiles();
    }, [])
    useEffect(() =>{
        setTimeout(() => {
            fetchFiles();
        }, 2000);
    })

    return (
        <>
        <Card>
            <Card.Header as="h5">File Info</Card.Header>
            <Card.Body>
                { selectedFile ? (
                    <FileInfo selectedFile={selectedFile} setSelectedFile={setSelectedFile} setAlertFunctions={setAlertFunctions} />
                ) :(
                    <Card>

                        Select a File in the list to view its details.
                    </Card>
                )}
            </Card.Body>
        </Card>
        <Card>
            <Card.Header as="h5">File List</Card.Header>
            <Input type="text" placeholder="Filter.." value={searchText} onChange={registerKey} onKeyUp={handleSearch}></Input>
            <Card.Body >
                    { fileList && (
                        <ListGroup as="ol" numbered style={{maxHeight: 360, overflow: 'auto', width: "100%"}}>
                            {fileList.map((file) => (
                                <FileListItem key={file.date} file={file} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                            ))}
                        </ListGroup>

                    )}
                </Card.Body>

        </Card>
        </>
    )

    }


export default PrinterFiles;