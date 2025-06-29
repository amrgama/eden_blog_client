import { createContext, useContext, useState } from "react";

const TagsContext = createContext();

export const TagsContextProvider = ({tagsRef, tagsRefVal, children})=>{
    const initialVal = (tagsRefVal)? tagsRefVal: []  
    const [tags, setTags]= useState([...initialVal]);
    // console.log("tags", tags);
    return(
        <TagsContext.Provider value={{tags, setTags}}>
            <input 
            name={"tags"}
            ref={tagsRef}
            value={tags}
            type="hidden"
            />
            {children}
        </TagsContext.Provider>
    )
}

export default TagsContext;