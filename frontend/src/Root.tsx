import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import { Theme, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react'
import NavBar from './components/navBar'
import { Alert, AlertColor, Collapse } from '@mui/material';

interface MainState {
    theme: Theme,
    alertMessage: string | null,
    alertVariant: AlertColor | undefined,
    alertShow: boolean,
}

function Root(){
    const defaultState: MainState = {
        theme: createTheme({
            palette: {
              mode: 'dark',
            },
          }),
        alertMessage: null,
        alertVariant: undefined,
        alertShow: false,
    }
    const [theme, setTheme] = useState(defaultState.theme)
    const [alertMessage, setAlertMessage] = useState(defaultState.alertMessage)
    const [alertVariant, setAlertVariant] = useState(defaultState.alertVariant)
    const [alertShow, setAlertShow] = useState(defaultState.alertShow)
    const setAlertFunctions = {
      setAlertMessage: setAlertMessage,
      setAlertVariant: setAlertVariant,
      setAlertShow: setAlertShow
    }
    useEffect(() => {

    }, [alertMessage])

    return(
        <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Collapse in={alertShow}>
          <Alert severity={alertVariant} onClose={() => {setAlertMessage(null); setAlertShow(false)}}>
            {alertMessage}
          </Alert>
          </Collapse>
          <NavBar setTheme={setTheme}/>
          <App setAlertFunctions={setAlertFunctions}/>
        </BrowserRouter>
      </ThemeProvider>
    )
}

export default Root;