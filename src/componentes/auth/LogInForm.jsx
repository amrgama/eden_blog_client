import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../form/FormInput'
import { useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../features/auth/authSlice'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react"
import spinner from "../../assets/animations/spinner.json"
import SubmitBtn from '../form/SubmitBtn'
import { AnimatePresence } from 'framer-motion'

const yupSchema = yup.object({
    email: yup.string().
    required("email is required").
    email(),
    password: yup.string().
    required("password is required").
    min(8, "password length must be at least 8")
})
// matches("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]$",
// "password must has at least one letter, one number and one special characte"),

const LogInForm = () => {
    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(yupSchema)
    })

    const dispatch = useDispatch()
    const {user, isLoading, isSuccess, isError, message, meta} = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(()=>{

        if(meta?.action === "logIn"){

            if(isError){
                toast.error(message)
            }
    
            if(isSuccess && Object.keys(user).length){
                navigate("/")
            }
        }

    }, [user, isLoading, isSuccess, isError, navigate, dispatch])
 
    const isDisapled = ()=> {
        if(Object.keys(errors).length){
            return true
        }
        return false
    }

    const submit = (data)=>{
        console.log("submitData", data)
        if(data){
            dispatch(login(data))
        }
    }

    // console.log("errors", errors)

  return (
    <div className="w-100 px-3 px-md-4 px-lg-5 py-5 bg-white box-shadow-sm border border-3 border-dark"
    style={{maxWidth: "700px"}}>    
        <form 
        onSubmit={handleSubmit(submit)} 
        autoComplete="off"
        noValidate
        className="form d-flex flex-column gap-4 position-relative">
            <FormInput
                id={"email"}
                name={"email"}
                type={"email"}
                placeholder={"email"}
                register={{...register("email")}}
                errorMsg={errors?.email?.message}
            />
            <FormInput
                id={"password"}
                name={"password"}
                type={"password"}
                placeholder={"password"}
                register={{...register("password")}}
                errorMsg={errors?.password?.message}
            />
            <div className="col-12" style={{height: "55px"}}>
                <SubmitBtn text={"Get in"} isLoading={isLoading} isDisabled={isDisapled()} />
            </div>
            <span className='text-secondary'>
                If you haven't account yet, go and create one 
                <Link to={"/signup"} className='nav-link text-primary text-decoration-underline'>Create Account</Link>
            </span>
        </form>
    </div>
  )
}

export default LogInForm