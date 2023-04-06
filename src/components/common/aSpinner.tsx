
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

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
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default ASpinner