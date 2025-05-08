import React, { useEffect, useMemo, useRef, useState } from 'react'
import ErrorMsg from '../form/ErrorMsg';
import { AnimatePresence } from 'framer-motion';
import { uploadImg } from '../../features/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BsUpload } from 'react-icons/bs';
import {AiOutlineEdit} from "react-icons/ai"
import SkeletonImage from '../skeletonLoading/SkeletonImage';
import usePrivateFetch from '../../hooks/usePrivateFetch';
import { combineWithBaseUrl } from '../../utils/helper';
import ActionButton from '../ui-kits/buttons/ActionButton';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

// const Upload = ({id, name, text, imageUrlRef, imageUrlRefVal, onChange: handleFile, errMsg, extraClasses}) => {
const UploadImg = ({id, text, onChange: handleFileErrors, defaulImageUrlVal, imageUrlRef, errMsg, extraClasses}) => {
    const classes = extraClasses? extraClasses: "";
    const [imageUrl, setImageUrl] = useState(defaulImageUrlVal);
    const navigate= useNavigate();
    const inputRef= useRef();
    const {
        callApi, 
        isIdel,
        isLoading, 
        isSuccess, 
        errorMsg: apiErrorMsg
    } = usePrivateFetch("/file", "post", {headers: {"content-type": "multipart/form-data"}}, navigate);
    
    const deleteFileApi = usePrivateFetch("/file", "delete", {}, navigate);
    const handleOnInput = (e)=>{
        handleFileErrors(e.target.files)
    }

    const upload = async (e)=>{
        const value = e.currentTarget.files;
        
        if(!errMsg){
            const formData = new FormData()
        
            formData.append("image", value[0])
            
            const response = (!!imageUrl)? await callApi(`/${imageUrl?.split("/")?.at(-1)}`, formData, "put"): await callApi("/upload", formData, "post");
            setImageUrl(response?.image);
        }
    }

    useEffect(()=>{
        imageUrlRef.current = imageUrl;
    }, [imageUrl])

    return (
        <div className={`image-upload-box w-100 h-100 ${classes}`}>
            <div  
                className={`h-100 d-flex align-items-center justify-content-center position-relative ${errMsg? "text-danger": "text-dark"} bg-white`}
            >
                <input 
                    id={id}
                    ref={inputRef}
                    type="file"             
                    onInput={handleOnInput}
                    onChange={upload}
                    className='position-absolute'
                    style={{visibility: "hidden"}}
                />
                {
                    (!isLoading && !!!imageUrl) &&
                    <label 
                    htmlFor={id} 
                    className='d-flex align-items-center justify-content-center'
                    style={{cursor: "pointer"}}
                    >
                        <BsUpload className='fs-4 text-primary me-2'/>
                        <span className='fs-4 text-primary fs-bold'>{text}</span>
                    </label>
                }
                
                {
                    (isLoading && !isIdel) &&
                    <SkeletonImage />
                }
                {
                    (!!imageUrl && !isLoading) &&
                    <>
                        <img 
                            id="imagePreview"
                            name="imagePreview"
                            src={combineWithBaseUrl(imageUrl)}
                            alt="..."
                            className='d-block w-100 h-100'
                            style={{objectFit: "contain", objectPosition: "center"}} 
                        />
                        <div className="overlay">
                            <label 
                            htmlFor='file'
                            className='main-button d-flex align-items-center justify-content-center'
                            style={{cursor: "pointer"}}
                            >
                                <div className='fs-4 text-white fs-bold position-relative'>
                                    <span className="d-flex align-items-center">
                                        <AiOutlineEdit className='me-2'/> Edit
                                    </span>
                                </div>
                            </label>
                            
                            <ActionButton
                                text={"Delete"}
                                icon={<RiDeleteBin5Line className="mb-1 fs-5" />}
                                cb={async()=> {
                                    console.log("imageUrl", imageUrl);
                                   const res= await deleteFileApi.callApi(`/${imageUrl?.split("/")?.at(-1)}`, {});
                                    if(!!!res?.error){
                                        setImageUrl(null);
                                        inputRef.current.value= "";
                                    }
                                   console.log("res when delete", res);
                                }}
                                isLoading={deleteFileApi.isLoading}
                                isDisable={deleteFileApi.isLoading}
                                animated={false}
                                extraClasses={"normalize-btn main-button fs-4 bg-transparent"}
                            />
                        </div>
                    </>
                }
            </div>
            <AnimatePresence mode='await' initial="false">
                {errMsg && <ErrorMsg message={errMsg} extraClasses={"mt-1"} />}
            </AnimatePresence>
            {/* <input name="imageUrl" ref={imageUrlRef} type="hidden" value={imageUrl || ""} /> */}
        </div>
    )
}

export default UploadImg