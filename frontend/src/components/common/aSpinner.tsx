
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

interface ASpinnerState {
    isLoading: boolean;
    showSpinner: boolean;
}

function ASpinner() {
    

    useEffect(() => {
        setTimeout(() => {
            
        }, 1000);
    })


    return (
        <CircularProgress />
    )
}

export default ASpinner