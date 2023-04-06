import { useEffect, useState } from "react";
import { Badge, ListGroup, Table } from "react-bootstrap";
import ReactTimeAgo from "react-time-ago";
import UtilitiesService from "../../services/utilities.service";


function FileListItem({file, selectedFile, setSelectedFile}) {

    const [active, setActive] = useState(false);
    const [variant, setVariant] = useState();
    const [success, setSuccess] = useState(0);
    const [error, setError] = useState(0);

    const toDateTime = (secs: number) => {
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
            }else{
                setVariant("success");
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

export default FileListItem;