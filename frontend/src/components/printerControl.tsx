import { Card, CardContent, Grid, Paper, styled } from "@mui/material";
import { useState, useEffect } from "react";

export interface PrinterControlState {
    isPrinting: boolean;
    isConnected: boolean;
}


function PrinterControl(){

    const defaultState: PrinterControlState = {
        isPrinting: false,
        isConnected: false
    }
    const [isPrinting, setIsPrinting] = useState(defaultState.isPrinting);
    const [isConnected, setIsConnected] = useState(defaultState.isConnected);
    

    return (
        <>
        <Card>
            <CardContent>
            <Grid container spacing={2}>
            <Grid xs={8}>
                xs=8
            </Grid>
            <Grid xs={4}>
                xs=4
            </Grid>
            <Grid xs={4}>
                xs=4
            </Grid>
            <Grid xs={8}>
                xs=8
            </Grid>
            </Grid>
            </CardContent>
        </Card>
        </>
    )

}

export default PrinterControl;