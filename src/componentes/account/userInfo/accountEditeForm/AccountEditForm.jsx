import React, { useEffect, useRef, useState } from 'react'
import SubmitBtn from '../../../form/SubmitBtn'
import { Controller, useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import TwitterButton from './TwitterButton'
import FacebookButton from './FacebookButton'
import RedditButton from './RedditButton'
import EditableVector from './EditableVector'
import QuoraButton from './QuoraButton'
import YoutubeButton from './YoutubeButton'
import { selectAccount } from '../../../../features/account/accountSlice'
import ControlledFormInput from '../../../form/ControlledFormInput'
import ControlledTextarea from '../../../form/ControlledTextarea'
import { toast } from 'react-toastify'
import withInterceptors from '../../../../utils/withInterceptors'
import BioInput from './BioInput'

const yupSchema = yup.object({
    firstName: yup.string().required("first name is required"),
    lastName: yup.string().required("last name is required"),
    userName: yup.string()
    .required("user name is required")
    .min(3, "username must not has less than 3 characters")
    .max(20, "username must not has more than 20 characters")
    .test("username must start with @", (value)=>{
        return value.at(0) === "@";
    }),
    bio: yup.string(),
    password: yup.string(),
    quoraLink: yup.string()
    .test("invalid quora link", (value)=>{
        const quoraRgx = /https?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/i
        return !value || value?.match(quoraRgx)
    }),
    redditLink: yup.string()
    .test("invalid reddit link", (value)=>{
        const redditRgx = /https?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/i
        return !value || value?.match(redditRgx)
    }),
    youtubeLink: yup.string()
    .test("invalid youtube link", (value)=>{
        const youtubeRgx = /https?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/i
        return !value || value?.match(youtubeRgx)
    }),
    twitterLink: yup.string()
    .test("invalid twitter link", (value)=>{
        const twitterRgx = /https?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/i
        return !value || value?.match(twitterRgx)
    }),
    facebookLink: yup.string()
    .test("invalid facebook link", (value)=>{
        const facebookRgx = /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i
        return !value || value?.match(facebookRgx)
    }),
})

const AccountEditForm = () => {
    const {
        handleSubmit,
        register,
        control,
        formState: {errors},
        clearErrors,
        reset
    } = useForm({
        resolver: yupResolver(yupSchema)
    })

    const dispatch = useDispatch()
    const {user} = useSelector(selectAccount)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [muteLink, setMuteLink] = useState(true);
    const [activeLink, setActiveLink] = useState("");
    const {quoraLabel, redditLabel, youtubeLabel, twitterLabel, facebookLabel} = {"quoraLabel": "quora", "redditLabel": "reddit", "youtubeLabel": "youtube", "twitterLabel": "twitter", "facebookLabel": "facebook"}
    const imageUrlRef = useRef();
    const bioRef = useRef();
    
    const submit = async(data)=>{
        
        if(data){
            const userInformation = (()=>{
                if(!!data.bio){
                    return {
                        ...data,
                        "vector": imageUrlRef.current.value,
                    }
                }

                const {bio, ...restData}= data;
                return {
                    ...restData,
                    "vector": imageUrlRef.current.value,
                }
            })()
            try{
                setIsLoading(true)
                const axiosWithInterceptors = await withInterceptors();
                const response = await axiosWithInterceptors
                    .put(`/user/account/edit`,JSON.stringify({...userInformation}))
                    console.log("response in edit user account", response)

                    setIsLoading(false)
                    setIsSuccess(true)
                }
                catch(err){
                    setIsError(true)
                    if(!err?.response){
                        setErrorMsg("No server response")
                    }
                    else if(err?.response?.status === 400){
                    setErrorMsg("Missing some post information")
                }
                else if(err?.response?.status === 404){
                    setErrorMsg("This account not found")
                }
                else{
                    message = "Sorry, something wrong when you edit your account try again"
                }
                setErrorMsg(message)
            }
        }
    }

    useEffect(()=>{

        if(isSuccess && user){
            toast.success("Your account edited successfully")
        }

        if(isError && errorMsg){
            toast.error(errorMsg)
        }

        return ()=> {
            console.log("in unmount")
            reset()
        };
    }, [isLoading, isSuccess, isError, errorMsg, dispatch])
    
    return (
        <form 
            onSubmit={handleSubmit(submit)} 
            autoComplete='off'
            noValidate
            className="form d-flex flex-column align-items-center gap-3"
        >
            {/* <div 
                className="w-fit rounded-circle p-2 bg-white border border-dark box-shadow-sm"
            > */}
                <Controller
                    control={control}
                    name={"image"}
                    label={"image"}
                    defaultValue={(user)? user.vector : [{"type":"image/jpg"}]}
                    render={ ({ field: { onChange, value, ref }, fieldState: {isDirty} })=>{
                        return (
                            <div style={{width: "100px", height: "100px"}}>
                                <EditableVector
                                    id={"file"}
                                    name={"image"}
                                    imageUrlRef={imageUrlRef}
                                    imageUrlRefVal={(user)? user.vector : ""}
                                    isDirty={isDirty}
                                    onChange={onChange}
                                    value={value}
                                    errMsg= {errors?.image?.message}
                                />
                            </div>
                        )
                    }}
                />
            {/* </div> */}
            
            <div className="col-12">
                <Controller
                    control={control}
                    name={"firstName"}
                    defaultValue = {user?.firstName || ""}
                    render={ ({ field: {onChange, value} })=>{
                        return <ControlledFormInput
                                id={"firstName"}
                                name={"firstName"}
                                type={"text"}
                                placeholder={"first name"}
                                onChange={onChange}
                                value={value}
                                errorMsg={errors?.firstName?.message}
                                extraClasses={"py-2"}
                            />
                    }}
                />
            </div>
            <div className="col-12">
                <Controller
                    control={control}
                    name={"lastName"}
                    defaultValue = {user?.lastName || ""}
                    render={ ({ field: {onChange, value} })=>{
                        return <ControlledFormInput
                                id={"lastName"}
                                name={"lastName"}
                                type={"text"}
                                placeholder={"last name"}
                                onChange={onChange}
                                value={value}
                                errorMsg={errors?.lastName?.message}
                                extraClasses={"py-2"}
                        />
                    }}
                />
            </div>
            <div className="col-12">
                <Controller
                    control={control}
                    name={"userName"}
                    defaultValue = {user?.userName || ""}
                    render={ ({ field: {onChange, value} })=>{
                        return <ControlledFormInput
                                id={"userName"}
                                name={"userName"}
                                type={"text"}
                                placeholder={"username"}
                                onChange={onChange}
                                value={value}
                                errorMsg={errors?.userName?.message}
                                extraClasses={"py-2"}
                            />
                    }}
                />
            </div>
            <div className="col-12">
                <Controller
                    control={control}
                    name={"password"}
                    defaultValue = {""}
                    render={ ({ field: {onChange, value} })=>{
                        return <ControlledFormInput
                                id={"password"}
                                name={"password"}
                                type={"password"}
                                placeholder={"reset password"}
                                onChange={onChange}
                                value={value}
                                errorMsg={errors?.password?.message}
                                extraClasses={"py-2"}
                            />
                    }}
                />
            </div>
            <div className="col-12">
                <BioInput bioRef={bioRef} defaultVal={user?.bio ?? ""} />
            </div>
            <div
                className="col-12 d-flex align-items-start justify-content-center position-relative"
                style={{height: `${activeLink? `${(errors?.quoraLink || errors?.redditLink || errors?.youtubeLink || errors?.facebookLink)? "calc( 125px + 0.5rem)": "calc( 95px + 0.5rem)"}`: "fit-content"}`}}      
            >
                <div 
                    className="link-wrapper mx-1"
                >
                    <QuoraButton
                        value= {quoraLabel}
                        bgColor={"#E4405F"}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                    />
                    {
                        activeLink === quoraLabel &&
                        <>
                        {/* <span className="position-absolute bottom-100 end-0 bg-warning" style={{height: "10px", width: "10px"}}></span> */}
                        <div 
                            className="w-100 position-absolute start-0"
                            style={{top: "calc(45px + 0.5rem)"}}
                        >
                            <Controller
                                control={control}
                                name={"quoraLink"}
                                defaultValue = {user?.socialLinks?.quora || ""}
                                render={ ({ field: {onChange, value} })=>{
                                    return <ControlledFormInput
                                        id={"quora-link"}
                                        name={"quoraLink"}
                                        type={"text"}
                                        placeholder={"Enter valid quora link"}
                                        onChange={onChange}
                                        value={value}
                                        errorMsg={errors?.quoraLink?.message}
                                        extraClasses={"py-2 m-0"}
                                        style={{minHeight: "50px", backgroundColor: "#E4405F"}}
                                    />
                                }}
                            />
                        </div>
                        </>
                    }
                </div>

                <div 
                    className="link-wrapper mx-1"
                >
                    <RedditButton
                        value= {redditLabel}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                    />
                    {
                        activeLink === redditLabel &&
                        <div 
                            className="w-100 position-absolute start-0"
                            style={{top: "calc(45px + 0.5rem)"}}
                        >
                            <Controller
                                control={control}
                                name={"redditLink"}
                                defaultValue = {user.socialLinks.reddit || ""}
                                render={ ({ field: {onChange, value} })=>{
                                    return <ControlledFormInput
                                        id={"reddit-link"}
                                        name={"redditLink"}
                                        type={"text"}
                                        placeholder={"Enter valid reddit link"}
                                        onChange={onChange}
                                        value={value}
                                        errorMsg={errors?.redditLink?.message}
                                        extraClasses={"py-2 m-0"}
                                        style={{minHeight: "50px", backgroundColor: "#E4405F"}}
                                    />
                                }}
                            />
                        </div>
                    }
                </div>

                <div 
                    className="link-wrapper mx-1"
                >
                    <YoutubeButton
                        value= {youtubeLabel}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                    />
                    {
                        activeLink === youtubeLabel &&
                        <div 
                            className="w-100 position-absolute start-0"
                            style={{top: "calc(45px + 0.5rem)"}}
                        >
                            <Controller
                                control={control}
                                name={"youtubeLink"}
                                defaultValue = {user?.socialLinks?.youtube || ""}
                                render={ ({ field: {onChange, value} })=>{
                                    return <ControlledFormInput
                                        id={"youtube-link"}
                                        name={"youtubeLink"}
                                        type={"text"}
                                        placeholder={"Enter valid youtube link"}
                                        onChange={onChange}
                                        value={value}
                                        errorMsg={errors?.youtubeLink?.message}
                                        extraClasses={"py-2 m-0"}
                                        style={{minHeight: "50px", backgroundColor: "#E4405F"}}
                                    />
                                }}
                            />
                        </div>
                    }
                </div>

                <div 
                    className="link-wrapper mx-1"
                >
                    <TwitterButton
                        value= {twitterLabel}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                        bgColor={"rgb(99 205 241)"}
                    />
                    {
                        activeLink === twitterLabel &&
                        <div 
                            className="w-100 position-absolute start-0"
                            style={{top: "calc(45px + 0.5rem)"}}
                        >
                            <Controller
                                control={control}
                                name={"twitterLink"}
                                defaultValue = {user?.socialLinks?.twitter || ""}
                                render={ ({ field: {onChange, value} })=>{
                                    return <ControlledFormInput
                                        id={"twitter-link"}
                                        name={"twitterLink"}
                                        type={"text"}
                                        placeholder={"Enter valid twitter link"}
                                        onChange={onChange}
                                        value={value}
                                        errorMsg={errors?.twitterLink?.message}
                                        extraClasses={"py-2 m-0"}
                                        style={{minHeight: "50px", backgroundColor: "rgb(99 205 241)"}}
                                    />
                                }}
                            />
                        </div>
                    }
                </div>
                
                <div 
                    className="link-wrapper mx-1"
                >
                    <FacebookButton
                        value= {facebookLabel}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                        bgColor={"rgb(99 205 241)"}
                    />
                    {
                        activeLink === facebookLabel &&
                        <div 
                            className="w-100 position-absolute start-0"
                            style={{top: "calc(45px + 0.5rem)"}}
                        >
                            <Controller
                                control={control}
                                name={"facebookLink"}
                                defaultValue = {user?.socialLinks?.facebook || ""}
                                render={ ({ field: {onChange, value} })=>{
                                    return <ControlledFormInput
                                        id={"facebook-link"}
                                        name={"facebookLink"}
                                        type={"text"}
                                        placeholder={"Enter valid facebook link"}
                                        onChange={onChange}
                                        value={value}
                                        errorMsg={errors?.facebookLink?.message}
                                        extraClasses={"py-2 m-0"}
                                        style={{minHeight: "50px", backgroundColor: "rgb(99 205 241)"}}
                                    />
                                }}
                            />
                        </div>
                    }
                </div>

            </div>
            <div className="col-12 mt-2" style={{height: "50px"}}>
                <SubmitBtn text={"Edit account"} isLoading={isLoading} isDisabled={!!Object.keys(errors).length} />
            </div>
        </form>
    )
}

export default AccountEditForm