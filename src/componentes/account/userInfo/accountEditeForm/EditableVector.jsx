import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { BsPerson, BsUpload } from 'react-icons/bs';
import ErrorMsg from '../../../form/ErrorMsg';
import { uploadImg } from '../../../../features/post/postSlice';

const isValidType= (file)=>{
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"]
    return validTypes.includes(file?.type);
}

function validation(files){
    if(!files.length) return "You must upload image" 
    if(!isValidType(value[0])) return "File uploaded type does not supported";
}

const EditableVector = ({id, name, value, onChange, imageUrlRef, imageUrlRefVal, errMsg, extraClasses}) => {
    console.log("value", value)
    const classes = extraClasses? extraClasses: "";
    const [imageUrl, setImageUrl] = useState(imageUrlRefVal)
    
    const dispatch = useDispatch()

    const handleErrors = async(e)=>{
        console.log("changeee")
        onChange(e.target.files)
    }
    const submitImage = (e)=>{
        if(!errMsg){    
            const formData = new FormData()
            console.log("file", value[0])
            formData.append("image", value[0])
            dispatch(uploadImg(formData))
            .then(res => setImageUrl(res.payload.image))
        }
    }

    return (
        <div className={`vector-edit-box w-100 h-100 mb-4 ${classes}`}>
            <div  
                className={`h-100 d-flex align-items-center justify-content-center position-relative ${errMsg? "text-danger": "text-dark"}`}
            >
                <input 
                    id={id}
                    name={name}
                    type="file"             
                    onInput={handleErrors}
                    onChange={submitImage}
                    className='position-absolute'
                    style={{visibility: "hidden"}}
                />

                <div className="vector w-100 h-100 d-flex position-relative rounded-circle">
                    {
                        !imageUrl &&
                        <label 
                            htmlFor={id}
                            className='w-100 h-100 d-flex'
                            style={{cursor: "pointer"}}
                        >
                            <BsPerson className='display-5 m-auto' />
                        </label>
                    }
                    {
                        imageUrl &&
                        <img 
                        id="imagePreview"
                        name="imagePreview"
                        src={imageUrl}
                        alt="..."
                        className='d-block w-100 h-100 rounded-circle position-absolute top-0 start-0'
                        style={{objectFit: "cover", objectPosition: "center"}} 
                        />
                    }
                    <div className="overlay">
                        <label 
                            htmlFor={id}
                            className='w-100 h-100 d-flex align-items-center justify-content-center'
                            style={{cursor: "pointer"}}
                        >
                            <div className='fs-4 text-white fs-bold position-relative'>
                                <span className="d-flex align-items-center">
                                    <BsUpload className=''/>
                                </span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <AnimatePresence mode='await' initial="false">
                {errMsg && <ErrorMsg message={errMsg} extraClasses={"mt-1"} />}
            </AnimatePresence>
            <input name="imageUrl" ref={imageUrlRef} type="hidden" value={imageUrl || ""} />
        </div>
    )
}

export default EditableVector