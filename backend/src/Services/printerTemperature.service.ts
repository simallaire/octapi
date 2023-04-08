import axios from 'axios';

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
        console.log(temperature)
        return temperature
    }
}
