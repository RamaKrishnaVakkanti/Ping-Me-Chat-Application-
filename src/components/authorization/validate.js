import axios from "axios";
import config from '../../config/properties.json';

const validate =()=>{
    return new Promise(async(resolve, reject)=>{
       const data= await axios(`${config.baseURL}/validate`,{
        headers: {
            Authorization: localStorage.getItem('token')
        },
        method: "GET"
    }).catch((err)=>{
        reject(err);
    });
    resolve(data.data);
    
    })
}
export default validate;