import express, { Application } from "express";
import axios from "axios";
import {TaskScheduler, Task} from "./Services/taskManager.service";
import PrinterTemperatureService from "./Services/printerTemperature.service";
import { printerTemperatureRouter } from "./Routers/PrinterTemperatureRouter";
import mongoose from "mongoose";
import cors from "cors";

import * as swaggerJson from './swagger.json';
import * as swaggerUI from 'swagger-ui-express';

const PORT = process.env.PORT || 8000;

axios.defaults.baseURL = "http://192.168.0.2:5000/api"
axios.defaults.headers.common = {
  'Authorization': `Bearer 446CC23E20A747C683DBD4D39732A0EC`,
   'Content-Type': 'application/json'
}
const app: Application = express();
const taskScheduler = new TaskScheduler();
console.log(process.env.CONN_STR || "");
mongoose
    // .connect("mongodb://spallaire93:log430@ac-u1zi2l8-shard-00-00.fu7pvmq.mongodb.net:27017,ac-u1zi2l8-shard-00-01.fu7pvmq.mongodb.net:27017,ac-u1zi2l8-shard-00-02.fu7pvmq.mongodb.net:27017/?ssl=true&replicaSet=atlas-21zqtl-shard-0&authSource=admin&retryWrites=true&w=majority")
    .connect('mongodb://user:pass@mongodb')
    .then((result) => {
        console.log('Mongo connected');
    })
    .catch((error) => {
        console.log('Error connecting to Mongo');
        console.log(error.message);
    });

app.use(cors());
app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use("/temperature", printerTemperatureRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  taskScheduler.addTask({service: new PrinterTemperatureService(), timeout: 5000});
  taskScheduler.run();

  });
