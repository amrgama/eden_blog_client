import { useDispatch, useSelector } from "react-redux"
import { resetAccessToken, selectUser } from "../features/auth/authSlice"
import axios from "../api/axios"

const useRefreshToken = async()=>{
    const dispatch = useDispatch()
    
    console.log("user", user)
    try{
        const response = await axios.get("/refresh", {
            withCredentials: true
        })

        console.log("respones", response.data)
        const accessToken = response.data.accessToken
        dispatch(resetAccessToken(accessToken))
        return accessToken;
    }
    catch(err){
        if(err) console.log("errinrefresh",err)
        return null;
    }
}

export default useRefreshToken