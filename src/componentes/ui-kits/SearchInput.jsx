import React, { useEffect, useRef, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import spinnerLoading from "../../assets/animations/spinner-loading.json"
import Lottie from 'lottie-react';

const SearchInput = ({cb, isLoading, label, placeholder, className}) => {
    const [query, setQuery]= useState(null);
    const timeOutId = useRef();
    // const searchInputRef = useRef();

    function handleOnChange(e){
        console.log("onChange",e.currentTarget.value)
        setQuery(e.currentTarget.value);
    }
    function handleOnKeyup(e){
        // console.log("inputRefVAlue", searchInputRef.current.value)
        setQuery(searchInputRef.current.value);
    }

    useEffect(()=>{
        if(query !== null){
            timeOutId.current= setTimeout(()=> {
                cb(query)
            }, 300);
        }
        return ()=>{
            clearTimeout(timeOutId.current);
        }
    },[query])
  return (
    <div className={className ?? ""}>
        {
            label &&
            <label htmlFor={label} className='form-label'>
                {label}
            </label>
        }
        <div className="input-group">
            <span className="d-inline-flex px-2 me-1 border-end border-dark">
                {
                    (isLoading)?
                        <Lottie 
                            animationData={spinnerLoading} 
                            loop={true} 
                            className={'d-flex align-items-center m-auto'} 
                            style={{width: "20px", height: "20px"}}
                        />
                    :
                        <IoSearchOutline className='m-auto' />
                }
            </span>
            <input
                // ref={searchInputRef}
                type='text'
                onChange={handleOnChange}
                // onKeyUp={handleOnKeyup}
                placeholder={placeholder}
                className='form-control col bg-transparent'
                aria-label={label ?? "search input"}
            />
        </div>
    </div>
  )
}

export default SearchInput