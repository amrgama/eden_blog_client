import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    id: null,
    firstName: "",
    lastName: "",
    email: ""
}

const guest = createSlice({
    name: "guest",
    initialState,
    reducers: {
        addGuest: (state, action)=>{
            state.id= uuidv4();
            
        }
    }
})