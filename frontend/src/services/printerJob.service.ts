import axios from 'axios'

class PrinterJobService{
    getJobProgress(){
        return axios.get("job")
                    .then(response => {
                        if(response.status === 200){
                            return response.data
                        }
                        return false
                    })
                    .catch(error => {
                        console.log(error)
                        return false
                    })
    }
}

export default new PrinterJobService();