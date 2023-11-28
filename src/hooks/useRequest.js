import axios from "axios";
import { BASE_URL } from "../constants/Util";
 
const useRequest = () => {
 
    const makeRequest = async (endPoint, method, body, headers, setter) => {
      
        console.log(BASE_URL+endPoint, method, body, setter)
        try {
            // console.log(BASE_URL,"url")
            const request = {
                method: method,
                url: BASE_URL+endPoint,
                data: body,
                headers: {
                    headers
                }
            }
            const response = await axios(request)
            // console.log(response.data)
            setter(response.data)
        } catch (err) {
            console.log(err.message)
            if (err.response) {
                if (err.response.status == 400) {
                    console.log("Status code 400:- User not found")
                } else if (err.response.status == 404) {
                  console.log("Not found");
                } else if (err.response.status > 500) {
                    console.log('Something went wrong')
                } else if (err.response.status == 401 && err.response.data.errors[0].name == 'TokenExpiredError') {
                    console.log('Status Code 401:- Session expired')
                    //localStorage.removeItem('token')
                }
            }
        }
    }
   
    return { makeRequest }
}
 
export default useRequest