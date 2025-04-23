import { createContext, useContext, useEffect, useState } from "react";

const CommentsContext = createContext();

export const CommentsContextProvider = ({commentsRef, initialVal, children})=>{
    // const initialVal = (commentsRef)? initialVal  
    // console.log("initialVal", initialVal)
    // const [comments, setComments]= useState([...initialVal]);
    
    // useEffect(()=>{
    //     setComments(initialVal)
    //     commentsRef.current= [...comments]
    //     console.log("commentsRef Value", commentsRef.current)
    // }, [initialVal]);
    
    // useEffect(()=>{
    //     commentsRef.current= [...comments]
    //     console.log("commentsRef Value", commentsRef.current)
    // }, [comments]);
    
    return(
        <CommentsContext.Provider value={{}}>
            {children}
        </CommentsContext.Provider>
    )
}

export default CommentsContext;