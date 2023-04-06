import axios from 'axios'

class PrinterConnectionService{
    connect(port: string, baudRate: number, autoconnect: boolean) {
        console.log("Connecting to printer at port " + port + " baud rate " + baudRate)
        return axios
            .post("connection", {
                "command": "connect",
                "port": port,
                "baudRate": parseInt(baudRate),
                "autoconnect": autoconnect,
                "printerProfile": "_default",
                "save": true,
                "autoConnect": autoconnect

            }).then((response) => {
                console.log(response)
                return response
            }).catch((error) => {
                console.log(error)
                return error
            })
    }
    getConnection(){
        return axios.get("connection").then((response) => {
            return response.data
        });
    }
    disconnect(){
        return axios.post("connection", {"command": "disconnect"}).then((response) => {
            return response
        });
    }
}

export default new PrinterConnectionService();