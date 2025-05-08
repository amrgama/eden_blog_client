import axios from "axios"
export const BASE_URL = "https://eden-blog-api.onrender.com";
// export const BASE_URL = "http://localhost:3500";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': "application/json",
        // 'Access-Control-Allow-Origin' : '*'
    },
    // withCredentials: true
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin' : '*'
    },
    withCredentials: true
})

// export const axiosPrivate = axios.create({
//     baseURL: BASE_URL,
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true    
// })

