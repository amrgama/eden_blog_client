import axios from "../api/axios"

const refresh = async()=>{    
    try{
        const response = await axios.get("/refresh", {
            withCredentials: true
        })

        console.log("respones in refresh", response.data)
        const accessToken = response.data.accessToken
        console.log("accessToken in refresh", accessToken)
        return accessToken;
    }
    catch(err){
        if(err) console.log("errinrefresh",err)
        return null;
    }
}

export default refresh