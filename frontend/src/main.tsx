import React from 'react'
import cors from 'cors';
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import express, { Express, Request, Response, Router} from 'express'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

const backend = express()
const port = 8000
backend.use(express.json())
backend.use(cors())
backend.get('/ping', (req, res) => {
  res.send('pong');
});

backend.listen(port, () => {
  console.log(`[Express]: Server is running at http://localhost:${port}`);
});