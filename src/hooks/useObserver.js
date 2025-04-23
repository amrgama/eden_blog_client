import React from 'react'

const useObserver = (cb) => {
    const observer= new IntersectionObserver(cb, {threshold: 1})
    // function observ(){
    //     if(window.innerHeight > observedEle.current.getBoundingClientRect().bottom){
    //         cb()
    //     }
    // }
    return observer;
}

export default useObserver