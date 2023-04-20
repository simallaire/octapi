import mongoose, { Schema } from 'mongoose';

export interface IPrinterTemperatureRequest {
    bedActual: number;
    bedTarget: number;
    toolActual: number;
    toolTarget: number;
}

export interface IPrinterTemperature {
    bedActual: number;
    bedTarget: number;
    toolActual: number;
    toolTarget: number;
    date: string;
}

const PrinterTemperature: Schema = new Schema<IPrinterTemperature>({
    bedActual: { type: Number, required: true },
    bedTarget: { type: Number, required: true },
    toolActual: { type: Number, required: true },
    toolTarget: { type: Number, required: true },
    date: { type: String, required: true },
},{ timestamps: true, timeseries: { timeField: 'createdAt', granularity: 'seconds'}});

export default mongoose.model<IPrinterTemperature>('printerTemperature', PrinterTemperature);
