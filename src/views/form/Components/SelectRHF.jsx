import { MenuItem, TextField } from "@mui/material";
import React from "react";
import { useForm, } from "react-hook-form";

export const SelectRHF = ({ data, name }) => {
  const { formState, register } = useForm();

  console.log(data);
  const dataSelect = data;

  const { errors } = formState;
  

  return (
    <TextField
      select
      variant="outlined"
      fullWidth
      label="Select"
      inputProps={register(name, {
        required: "Por favor seleccione un valor",
      })}
      error={errors.currency}
      helperText={errors.currency?.message}>
      {dataSelect.data.map((option) => (
       <MenuItem key={option.id} value={option.id}>
         {option.name}
       </MenuItem>
     ))} 
   </TextField>
  );
};
