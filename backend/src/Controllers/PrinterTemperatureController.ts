import { Body, Get, Post, Query, Route } from 'tsoa';
import PrinterTemperature, { IPrinterTemperature } from '../Models/PrinterTemperature';

@Route('/temperature')
export class PrinterTemperatureController {
    
    @Get('getLastN')
    async getLastNTemperatures(@Query() n: string): Promise<IPrinterTemperature[]> { 
        let printerTemperatures = await PrinterTemperature.find({}, null, { sort: { 'createdAt': -1 }}).limit(parseInt(n));
        printerTemperatures = printerTemperatures.reverse()
        return printerTemperatures;
    }

    @Get('getAll')
    async getTemperatures(): Promise<IPrinterTemperature[]> {
        let printerTemperatures = await PrinterTemperature.find({}).sort({ date: -1 });

        return printerTemperatures;
    }
}
