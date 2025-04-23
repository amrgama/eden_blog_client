import React, { useEffect, useMemo, useRef, useState } from 'react'
import ErrorMsg from '../form/ErrorMsg';
import { AnimatePresence } from 'framer-motion';
import { uploadImg } from '../../features/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BsUpload } from 'react-icons/bs';
import {AiOutlineEdit} from "react-icons/ai"
import SkeletonImage from '../skeletonLoading/SkeletonImage';
import usePrivateFetch from '../../hooks/usePrivateFetch';

function validation(files){
    if(!files.length) return "You must upload image"

    const validType= ["image/jpeg", "image/png", "image/jpg", "image/svg+xml", "image/webp"]
    .includes(value[0]?.type);

    if(!validType) return "File uploaded type does not supported";
}

// const Upload = ({id, name, text, imageUrlRef, imageUrlRefVal, onChange: handleFile, errMsg, extraClasses}) => {
const Upload = ({watch, id, name, text, defaultVal, imageUrlRef, register, errMsg, extraClasses}) => {
    console.log("defaultVal: ", defaultVal)
    const classes = extraClasses? extraClasses: "";
    const [prevValue, setPrevValue]= useState({});
    // const [imageUrl, setImageUrl] = useState(defaultVal)
    // const [file, setFile] = useState();
    // const fileRef = useRef()
    const {
        callApi, 
        isIdel,
        isLoading, 
        isSuccess, 
        isError, 
        errorMsg: apiErrorMsg
    } = usePrivateFetch("/file/upload", "post", {headers: {"content-type": "multipart/form-data"}});

    watch("image")

    // const upload = async (e)=>{
    //     const value = e.currentTarget.files;
        
    //     if(!errMsg){
    //         const formData = new FormData()
        
    //         formData.append("image", value[0])
    //         const response = await callApi(formData);
    //         setImageUrl(response.image);
    //     }
    // }
    
    // const uploadImg = async (value)=>{
    //      console.log("value in uploadImg: ", value)
    //     if(!errMsg){
    //         const formData = new FormData()
        
    //         formData.append("image", value[0])
    //         const response = await callApi(formData);
    //         setImageUrl(response.image);
    //     }
    // }

    // console.log("watching..........................")
    // console.log("watch value: ", watch("image"))
    // if(!!watch("image")){
    //     console.log("watch value: ", watch("image")?.files)
    //     // await uploadImg(watch("image").files)
    // }

    function handleOnInput(e){
        setPrevValue(e.currentTarget.files)
    }

    // const imageUrl = useMemo(()=>{
    //     // console.log("value in uploadImg: ", value)

    //     if(!!Object.keys(prevValue).length){

    //         if(!errMsg && prevValue["0"]?.name !== watch("image")["0"]?.name){
    
    //             console.log("fileName value: ", prevValue["0"]?.name, watch("image")["0"]?.name);

    //            (async()=>{
        
    //                const formData = new FormData()
    //                 console.log("watch()image", watch("image")[0]);
    //                formData.append("image", watch("image")[0])
    //                const response = await callApi(formData);
    //                // setImageUrl(response.image);
    //                return response.image;
    //             })()
    //         }
    //     }
    // }, [watch("image")])

    console.log("in upload input: ", "defaultVal: ", defaultVal, "errMsg: ", errMsg, "imageUrl: ",imageUrl)
    useEffect(()=>{

        // console.log("watch: ", watch("image")?.files)

        // if(!!watch("image") ){
        //     (
        //         async()=>{
        //             await uploadImg(watch("image"));
        //         }
        //     )()
        // }
        if(!errMsg && prevValue["0"]?.name !== watch("image")["0"]?.name){

            (async()=>{
            
                const formData = new FormData()
                 console.log("watch()image", watch("image")[0]);
                formData.append("image", watch("image")[0])
                const response = await callApi(formData);
                // setImageUrl(response.image);
                return response.image;
             })()
            console.log("prevValue: ", prevValue)
            console.log("imageUrl: ", imageUrl)
            imageUrlRef.current = imageUrl;
        }
    }, [imageUrl, prevValue, watch("image")])

    return (
        <div className={`image-upload-box w-100 h-100 ${classes}`}>
            <div  
                className={`h-100 d-flex align-items-center justify-content-center position-relative ${errMsg? "text-danger": "text-dark"}`}
            >
                <input 
                    id={id}
                    name={name}
                    type="file"             
                    onInput={handleOnInput}
                    // onChange={(e)=> console.log("changing.....")}
                    // onInput={upload}
                    {...register}
                    className='position-absolute'
                    style={{visibility: "hidden"}}
                />
                {
                    !isSuccess &&
                    <label 
                    htmlFor={id} 
                    className='d-flex align-items-center justify-content-center'
                    style={{cursor: "pointer"}}
                    >
                        <BsUpload className='fs-4 text-primary me-2'/>
                        <span className='fs-4 text-primary fs-bold'>{text}</span>
                    </label>
                }
                 {/* position-absolute top-0 start-0 */}
                
                {
                    (isLoading && !isIdel) &&
                    <SkeletonImage />
                }
                {
                   ( !!imageUrl && isSuccess) &&
                    <>
                        <img 
                            id="imagePreview"
                            name="imagePreview"
                            src={imageUrl}
                            alt="..."
                            className='d-block w-100 h-100'
                            style={{objectFit: "cover", objectPosition: "center"}} 
                        />
                        <div className="overlay">
                            <label 
                            htmlFor='file'
                            className='w-100 h-100 d-flex align-items-center justify-content-center'
                            style={{cursor: "pointer"}}
                            >
                                <div className='fs-4 text-white fs-bold position-relative'>
                                    <span className="d-flex align-items-center">
                                        <AiOutlineEdit className='me-2'/> Edit
                                    </span>
                                </div>
                            </label>
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

export default Upload