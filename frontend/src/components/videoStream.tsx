import { Card, CardContent, Collapse } from "@mui/material";
import { useState, useEffect } from "react";
import Switch from "./common/switch";
import { LinkedCamera } from "@mui/icons-material";

interface VideoStreamState {
    showStream: boolean;
}

function VideoStream() {
    const defaultState: VideoStreamState = {
        showStream: true,
    };
    const [showStream, setShowStream] = useState(defaultState.showStream);

    useEffect(() => {
        setShowStream(false);
    }, []);
    return (
        <>
            <Card>
                <Switch checked={showStream} label={<LinkedCamera/>} onChange={(e: any) => {setShowStream(!showStream)}} />
                <Collapse in={showStream}>
                        <CardContent>
                            <img style={{ width: "100%" }} src="http://192.168.0.110:8000/stream" />
                        </CardContent>
                </Collapse>
            </Card>
        </>
    )
}

export default VideoStream;