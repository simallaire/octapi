import { Input } from "@mui/material";
import { useEffect, useState } from "react";
import { Badge, ListGroup, Placeholder, Table } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Files, {File} from "../models/Files";
import PrinterFileService from "../services/printerFile.service";
import FileListItem from "./fileList/fileListItem";
import FileInfo from "./fileInfo";
import FuzzySearch from 'fuzzy-search';

interface PrinterFilesState {
    fileResponse: Files | undefined; 
    fileList: File[] | undefined;
    selectedFile: File | undefined;
    searchText: string;
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
            const searcher = new FuzzySearch(fileResponse.files || [], ["display"]);
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