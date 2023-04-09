import axios from 'axios';
import PrinterTemperature from '../Models/PrinterTemperature';

export default class PrinterTemperatureService {
    constructor(){
        
    }
    async getTemperature(){
        return await axios
        .get("printer")
        .then((response) => {
            if (response.data.temperature)
                return response.data.temperature
            return false
        }).catch((error) => {
            return false
        })
    }
    async run(){
        const temperature = await this.getTemperature()
        const printerTemperature = new PrinterTemperature({
            bedActual: temperature.bed.actual,
            bedTarget: temperature.bed.target,
            toolActual: temperature.tool0.actual,
            toolTarget: temperature.tool0.target,
            date: (new Date()).toUTCString()
        })
        console.log(await printerTemperature.save())
        return temperature
    }
}
