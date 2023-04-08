import express, { Application } from "express";
import axios from "axios";
import {TaskManager, Task} from "./Services/taskManager.service";
import PrinterTemperatureService from "./Services/printerTemperature.service";


const PORT = process.env.PORT || 8000;

axios.defaults.baseURL = "http://192.168.0.2:5000/api"
axios.defaults.headers.common = {
  'Authorization': `Bearer 446CC23E20A747C683DBD4D39732A0EC`,
   'Content-Type': 'application/json'
}
const app: Application = express();
const taskManager = new TaskManager();




app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  taskManager.addTask({service: new PrinterTemperatureService(), timeout: 5000});
  taskManager.run();

  });
