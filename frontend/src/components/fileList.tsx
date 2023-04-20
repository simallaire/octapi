import { Button, Card, CardContent, CardHeader, Input, List } from "@mui/material";
import { useEffect, useState } from "react";
import { Badge, ListGroup, Placeholder, Table } from "react-bootstrap";
import Files, {File} from "../models/Files";
import PrinterFileService from "../services/printerFile.service";
import FileListItem from "./fileList/fileListItem";
import FileInfo from "./fileInfo";
import FuzzySearch from 'fuzzy-search';

interface FileListState {
    fileResponse: Files | undefined; 
    fileList: File[] | undefined;
    searchText: string;
}

function FileList({setAlertFunctions, selectedFile, setSelectedFile}: any){

    const defaultState: FileListState = {
        fileResponse: undefined,
        fileList: undefined,
        searchText: ""
    }

    const [fileResponse, setFileResponse] = useState(defaultState.fileResponse);
    const [fileList, setFileList] = useState(defaultState.fileList);
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
            const searcher = new FuzzySearch(fileResponse?.files || [], ["display"]);
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
            <Input 
                type="text"
                placeholder="Filter.."
                value={searchText}
                onChange={registerKey}
                onKeyUp={handleSearch}
            />
            <CardContent >
                    { fileList && (
                        <List component="nav" sx={{maxHeight: 360, overflow: 'auto', width: "100%"}}>
                            {fileList.map((file) => (
                                <FileListItem 
                                    key={file.date} 
                                    file={file} 
                                    selectedFile={selectedFile} 
                                    setSelectedFile={setSelectedFile} 
                                />
                            ))}
                        </List>

                    )}
            </CardContent>

        </Card>
        </>
    )

    }


export default FileList;