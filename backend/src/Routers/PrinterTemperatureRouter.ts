import * as express from 'express';
import { PrinterTemperatureController } from '../Controllers/PrinterTemperatureController';

export const printerTemperatureRouter = express.Router();
const printerTemperatureController = new PrinterTemperatureController();


printerTemperatureRouter.get('/getAll', async (req: express.Request, res: express.Response) => {
    const temperatures = await printerTemperatureController.getTemperatures();
    res.status(200).send(JSON.stringify(temperatures));
 })

 printerTemperatureRouter.get('/getLastN', async (req: express.Request, res: express.Response) => {
    const n = req.query.n as string;
    const temperatures = await printerTemperatureController.getLastNTemperatures(n);
    res.status(200).send(JSON.stringify(temperatures));
})