import React from 'react'
import Category from './categories/Categories'
import { Controller, useForm } from 'react-hook-form'

const AsideCategory = ({defaultValue}) => {
    const{ control, formState: {errors} } = useForm();
  return (
    <Controller
        control={control}
        name={"category"}
        defaultValue = {defaultValue || ""}
        render={ ({ field: { onChange, value } })=>{
            return <Category
                id={"category"}
                name={"category"}
                onChange={onChange}
                value={value}
                errMsg={errors?.category?.message}
            />
        }}
    />
  )
}

export default AsideCategory