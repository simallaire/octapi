import axios from "axios";


class PrinterFileService{
    getFiles(){
        return axios
            .get("files")
            .then(res => {
                // console.log(res.data);
                return res.data;
            })

    }
    printFile(filepath: string){
        return axios.post("files/local/" + filepath, {
            "command": "select",
            "print": true
        }).then(res => {
            if(res.status === 204){
                return true;
            }
            return false;
        })
    }
    cancelPrint(){
        return axios.post("job", {
                "command": "cancel"
            }).then(res => {
                if(res.status === 204){
                    return true;
                }
                return false;
            })
    }
}
export default new PrinterFileService();
