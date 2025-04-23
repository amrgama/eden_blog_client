import React, { useEffect, useState } from 'react'
import ErrorMsg from '../form/ErrorMsg';
import { AnimatePresence } from 'framer-motion';
import { uploadImg } from '../../features/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost } from '../../features/post/postSlice';
import { toast } from 'react-toastify';
import { BsUpload } from 'react-icons/bs';
import { boolean, object } from 'yup';

const isEmpty = (obj)=>{
    if(obj !== null || obj !== undefined){
        return (Object.keys(obj).length === 0)
    }

    return true;
}

const ImageUpload = ({id, name, text, image, setImage, imageErr, setImageErr, imageValidate, onChange: outOnChange, extraClasses}) => {
    const classes = extraClasses? extraClasses: "";
    // console.log("post",useSelector(selectPost))
    // const post = useSelector(state => state.post);
    // console.log("post", post)
    // const [image, setImage] = useState()
    // const [errMsg, setErrMsg] = useState()
    // console.log("imagVal", value)
    const dispatch = useDispatch()

    const onChange = (e)=>{
        console.log("image", e.target.files[0])
        const validation = imageValidate?.validation
        
        if( validation && typeof validation(e.target.files) === "string" ){
            const message = validation(e.target.files);
            setImageErr(message)
            return;
        }
        else{
            setImageErr(undefined)
        }

        const formData = new FormData()
        formData.append("image", e.target.files[0])
        dispatch(uploadImg(formData))
        .then(res => setImage(res.payload.image))
    }

    const onBlur = (e)=>{
        console.log("bluer")
        if(imageValidate?.required?.value){
            setImageErr("You must upload cover image")
            return;
        }
        else{
            setImageErr(undefined)
        }

        // if(!e.target.files.length) {
        //     setImageErr("You must upload cover image")
        //     return;
        // }
        // else{
        //     setImageErr(undefined)
        // }
    }

    console.log("imgUrl", image)
    return (
        <>
        <div className={`image-upload-box w-100 mb-4 ${classes}`}>
            <div 
                className={`d-flex align-items-center justify-content-center position-relative ${imageErr? "text-danger": "text-dark"}`}
                style={{height: "350px"}}
            >
                <input 
                id={id}
                name={name}
                // name={name}
                // {...register}
                // onChange={(e)=> onChange(e.target.files)}
                onChange={outOnChange || onChange}
                onBlur={onBlur}
                type="file"
                className='position-absolute'
                style={{visibility: "hidden"}}
                />
                <label 
                htmlFor={id} 
                className='d-flex align-items-center justify-content-center'
                style={{cursor: "pointer"}}
                >
                    <BsUpload className='fs-4 text-primary me-2'/>
                    <span className='fs-4 text-primary fs-bold'>{text}</span>
                </label>

                <img 
                // src={image}
                // src="http://localhost:3500/uploads/1689783774091_wallpaper-for-computer-desktop-background.jpg"
                alt="..."
                className='d-block w-100 h-100 position-absolute top-0 start-0'
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
                                <BsUpload className='me-2'/>{text}
                            </span>
                            {/* <span className='d-block w-100 bg-dark position-absolute bottom-0 start-0' style={{height: "15px"}}></span> */}
                        </div>
                    </label>
                </div>
            </div>
            <AnimatePresence mode='await' initial="false">
                {imageErr && <ErrorMsg message={imageErr} extraClasses={"mt-1"} />}
            </AnimatePresence>
        </div>
        </>
    )
}

export default ImageUpload