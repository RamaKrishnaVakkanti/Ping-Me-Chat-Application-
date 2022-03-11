import axios from "axios";

const validate =()=>{
    return new Promise(async(resolve, reject)=>{
       const data= await axios('https://ping-me-chat-app-server.herokuapp.com/validate',{
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