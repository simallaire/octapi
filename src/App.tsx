import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PrinterInfo from './components/printerInfo'
import './App.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import PrinterConnection from './components/printerConnection'
import { Alert, Card, Stack } from 'react-bootstrap'
import PrinterFiles from './components/fileList'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en)

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.headers.common = {
  'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
   'Content-Type': 'application/json'
  }

interface AppState {
  alertMessage: string | null,
  alertVariant: string | null
  alertShow: boolean

}

function App() {
  const defaultState : AppState = {
    alertMessage: null,
    alertVariant: null,
    alertShow: false
  }
  const [count, setCount] = useState(0)
  const [alertMessage, setAlertMessage] = useState(defaultState.alertMessage)
  const [alertVariant, setAlertVariant] = useState(defaultState.alertVariant)
  const [alertShow, setAlertShow] = useState(defaultState.alertShow)
  
  const setAlertFunctions = {
    setAlertMessage: setAlertMessage,
    setAlertVariant: setAlertVariant,
    setAlertShow: setAlertShow
  }
  return (
    <>
  
      <Alert variant={alertVariant} show={alertShow} defaultShow={false} onClose={() => {setAlertMessage(null); setAlertShow(false)}} dismissible>
        {alertMessage}
      </Alert>

    <div className="App">
      <Row xs={1} md={2} className="g-4">
          <Col>
            {/* <Stack gap={2} className="col-md-5 mx-auto"> */}
              <Card.Body>
                <img src={reactLogo} alt="React Logo" className="logo"/>
              </Card.Body>
              <PrinterConnection />
              <PrinterInfo/>

            {/* </Stack> */}
          </Col>
          <Col>
            {/* <Stack gap={2} className="col-md-5 mx-auto"> */}
             
              <Card.Body>
                <img src={viteLogo} alt="Vite Logo" className="logo"/>
              </Card.Body>
              <PrinterFiles setAlertFunctions={setAlertFunctions} />

            {/* </Stack> */}
          </Col>
      </Row>

    </div>
    </>
  )
}

export default App
