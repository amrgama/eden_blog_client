export const findInputErrors = (errors, name)=>{
    const filtered = Object.keys(errors)
    .filter(key => key.includes(name))
    .reduce((cur, key)=>{
        return Object.assign(cur, {error: errors[key]})
    }, {})
    // Object.values(filtered)
    console.log("filtered", filtered)
    return filtered;
}

export const isFormInvalid = (errors)=>{
    if(Object.keys(errors).length > 0) return true;

    return false;
}