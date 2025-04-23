import axios from "axios"
const PASE_URL = "http://localhost:3500";

export default axios.create({
    baseURL: PASE_URL,
    headers: {
        'Access-Control-Allow-Origin' : '*'
    },
})

export const axiosPrivate = axios.create({
    baseURL: PASE_URL,
    headers: {
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin' : '*'
    },
    withCredentials: true
})

// export const axiosPrivate = axios.create({
//     baseURL: PASE_URL,
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true    
// })

