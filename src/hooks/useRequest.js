import axios from "axios";
import { BASE_URL } from "../constants/Util";
 
const useRequest = () => {
 
    const makeRequest = async (endPoint, method, body, headers, setter) => {
      
        try {
            const request = {
                method: method,
                url: BASE_URL+endPoint,
                data: body,
                headers: {
                    headers
                }
            }
            const response = await axios(request)
            setter(response.data)
        } catch (err) {
            console.log("Error: ",err.message)
            if (err.response) {
                if (err.response.status == 400) {
                    console.log("Status code 400:- User not found")
                } else if (err.response.status == 404) {
                  console.log("Not found");
                } else if (err.response.status > 500) {
                    console.log('Something went wrong')
                } else if (err.response.status == 401 && err.response.data.errors[0].name == 'TokenExpiredError') {
                    console.log('Status Code 401:- Session expired')
                }
            }
        }
    }
   
    return { makeRequest }
}
 
export default useRequest