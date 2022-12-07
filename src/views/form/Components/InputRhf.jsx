import { FormControl, MenuItem, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm, } from "react-hook-form";

export const InputRhf = ({name,setValue,errors,control}) => {
    console.log('')

  return (

    <Controller
               name={name}
               control={control}
               render={({field})=>(
                <FormControl fullWidth>
                    <TextField 
                    {...field}
                    autoComplete='off'
                    onChangeCapture={(e)=>{                       
                        setValue(`${name}`,e.target.value)
                    }}
                    label='Nombre'
                    size='small'
                    error={Boolean(errors.name)}
                    helperText={errors.name && errors.name.message}
                    />
                </FormControl >
               )}            
            /> 
  )
}




