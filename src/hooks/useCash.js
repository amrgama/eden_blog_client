const useCash = (key, value)=>{
    window.localStorage.setItem(key, JSON.stringify(value));
    return window.localStorage;
}

export default useCash;