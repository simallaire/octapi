import axios from 'axios'


class PrinterInfoService{
    getState(){
        return axios
        .get("printer")
        .then((response) => {
            if (response.data.state)
                return response.data.state
            return false
        })
        .catch((error) => {
            return false
        });
    }
    getTemperature(){
        return axios
        .get("printer")
        .then((response) => {
            if (response.data.temperature)
                return response.data.temperature
            return false
        }).catch((error) => {
            return false
        })

    }
    getTemperatureHistory(){
        return axios
            .get("printer?history=true&limit=1000")
            .then((response) => {
                // console.log(response)
                if (response.data.temperature.history)
                    return response.data.temperature.history
                return false
            }).catch((error) => {
                return false
            })
    }
    setTargetTemperature(temperature: number, toolname: string){
        if (toolname == "tool0"){
            return axios
                .post("printer/tool", 
                { 
                    "command": "target",
                    "targets": { "tool0": parseInt(temperature) }
                })
                .then((response) => {
                    return response.status
                })
            }
        if (toolname == "bed"){
            return axios
            .post("printer/bed", 
            { 
                "command": "target",
                "target" : parseInt(temperature)
            })
            .then((response) => {
                return response.status
            })
        }
    }
}

export default new PrinterInfoService();