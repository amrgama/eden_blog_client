import { v4 as uuidv4 } from 'uuid';

export function generate_uuid() {
    return uuidv4().slice(0, 12);
}

export function generate_unique_username(prefix){
    const maxPrefixLength = 12;
    if(prefix.length > maxPrefixLength){
        const negativeDifference = maxPrefixLength - prefix.length;
        prefix = prefix.slice(0, negativeDifference);

        prefix = (prefix.endsWith("_"))? prefix.slice(0, -1) : prefix;
    }
    const uniquePart = Date.now().toString(36);
    const username = `${prefix}_${uniquePart}`;
    return username;
}

export function isObjEmpty(obj) {
    return Object.keys(obj).length === 0
}

export function cash(key, value, store="localStorage"){

    if(store === "session"){
        
        window.sessionStorage.setItem(key, JSON.stringify(value));
        return window.sessionStorage;
    }
    
    window.localStorage.setItem(key, JSON.stringify(value));
    return window.localStorage;
}

export function getFromCash(key, store="localStorage"){

    if(store === "session"){
        
        return window.sessionStorage.getItem(key);
    }
    
    return window.localStorage.getItem(key);
}

export function removeFromCash(key, store="localStorage"){

    if(store === "session"){
        
        return window.sessionStorage.removeItem(key);
    }
    
    return window.localStorage.removeItem(key);
}

export function fillWithDash(text){
    const textArr = text.split(" ");
    return textArr.join("-");
}