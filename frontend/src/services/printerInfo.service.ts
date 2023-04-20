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
    getLastN_DB(n : string){
        return fetch("http://192.168.0.2:8000/temperature/getLastN?n="+n)
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }
            return false
        })
        .catch((error) => {
            console.log(error)
            return false
        })
    }
    setTargetTemperature(temperature: number, toolname: string){
        if (toolname == "tool0"){
            return axios
                .post("printer/tool", 
                { 
                    "command": "target",
                    "targets": { "tool0": parseInt(temperature as unknown as string) }
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
                "target" : parseInt(temperature as unknown as string)
            })
            .then((response) => {
                return response.status
            })
        }
    }
}

export default new PrinterInfoService();