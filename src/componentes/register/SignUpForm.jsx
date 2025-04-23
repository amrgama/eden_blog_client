import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../form/FormInput'
import { useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {register as registerAction} from '../../features/auth/authSlice'
import SubmitBtn from '../form/SubmitBtn'

const yupSchema = yup.object({
    firstName: yup.string().required("first name is required"),
    lastName: yup.string().required("last name is required"),
    // userName: yup.string().required("user name is required"),
    email: yup.string().
    required("email is required").
    email(),
    password: yup.string().
    required("password is required").
    min(8, "password length must be at least 8")
})
// matches("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]$",
// "password must has at least one letter, one number and one special characte"),

const SignUpForm = () => {
    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(yupSchema)
    })

    const dispatch = useDispatch()
    const {user, meta, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)
    const navigate = useNavigate()
   
    useEffect(()=>{
        if(meta?.action === "register"){
            if(isError){
                toast.error(message)
            }
    
            if(isSuccess){
                navigate("/login")
            }
        }

    }, [user, isLoading, isSuccess, isError, meta, navigate, dispatch])

    const isDisapled = ()=> {
        if(Object.keys(errors).length){
            return true
        }
        return false
    }

    const submit = (data)=>{

        // if(data) console.log("sended data")
        if(data){
            console.log("submitData", data)
            dispatch(registerAction(data))
        }
    }
    
    
    // console.log("errors", errors)

  return (
    <div className="w-100 px-3 px-md-4 px-lg-5 py-5 bg-white box-shadow-sm border border-3 border-dark"
    style={{maxWidth: "700px"}}>    
        <form 
        onSubmit={handleSubmit(submit)} 
        autoComplete='off'
        noValidate
        className="form d-flex flex-column gap-4">
            <FormInput
                id={"firstName"}
                name={"firstName"}
                type={"text"}
                placeholder={"first name"}
                register={{...register("firstName")}}
                errorMsg={errors?.firstName?.message}
            />
            <FormInput
                id={"lastName"}
                name={"lastName"}
                type={"text"}
                placeholder={"last name"}
                register={{...register("lastName")}}
                errorMsg={errors?.lastName?.message}
            />
            {/* <FormInput
                id={"userName"}
                name={"userName"}
                type={"text"}
                placeholder={"user name"}
                register={{...register("userName")}}
                errorMsg={errors?.userName?.message}
            /> */}
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
                <SubmitBtn text={"Create Account"} isLoading={isLoading} isDisabled={isDisapled()} />
            </div>
            <span className='text-secondary'>
                If you have account already, let's get in 
                <Link to={"/login"} className='nav-link text-primary text-decoration-underline'>Log In</Link>
            </span>
        </form>
    </div>
  )
}

export default SignUpForm