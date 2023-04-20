import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PrinterInfo from './components/printerInfo'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PrinterConnection from './components/printerConnection'
import { Alert } from 'react-bootstrap'
import FileList from './components/fileList'
import {Box, Divider, Stack} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2';
import { File } from './models/Files'
import FileInfo from './components/fileInfo'


const Grid = Grid2;


interface AppState {
  isPrinting: boolean,
  selectedFile: File | null

}

function App({setAlertFunctions}: any) {
  const defaultState : AppState = {
    isPrinting: false,
    selectedFile: null
  }
  const [count, setCount] = useState(0)
  const [isPrinting, setIsPrinting] = useState(defaultState.isPrinting)
  const [selectedFile, setSelectedFile] = useState(defaultState.selectedFile)



  return (
    <>

      <div className="App">
        <Box sx={{ flexGrow: 0 }}>
            <Grid container spacing={1}>
              <Grid xs={6}>
                <Stack justifyContent="space-evenly">
                  <Grid>
                    <PrinterConnection />
                  </Grid>
                  <Grid>
                    <PrinterInfo setIsPrinting={setIsPrinting} isPrinting={isPrinting} setAlertFunctions={setAlertFunctions}/>
                  </Grid>
                  <img src={viteLogo} alt="Vite Logo" className="logo" />

                </Stack>
              </Grid>
              <Grid xs={6}>
                <Stack justifyContent="space-evenly">

                    <Grid>
                      <FileInfo selectedFile={selectedFile} setSelectedFile={setSelectedFile} setAlertFunctions={setAlertFunctions}  />
                    </Grid>
                    <Grid>
                      <FileList selectedFile={selectedFile} setSelectedFile={setSelectedFile}  setAlertFunctions={setAlertFunctions} />
                    </Grid>
                    
                    <img src={reactLogo} alt="React Logo" className="logo"/>

                </Stack>
              </Grid>
          </Grid>
        </Box>
      </div>
    </>
  )
}

export default App
