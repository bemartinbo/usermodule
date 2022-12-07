import { useForm,Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select ,TextField} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getContratos, getEmpresas } from 'helpers/general';
import { useState,useEffect } from 'react';
import { saveDataForm } from 'helpers/saveDataForm';
import { StyledDropzone } from './Components/StyledDropzone';
import { checkRut, prettifyRut } from "react-rut-formatter";
import { llamadaApi } from 'api/reqApi';
import { SelectRHF } from './Components/SelectRHF';
import { InputRhf } from './Components/InputRhf';




const validar = yup.object().shape({
  rut:yup
  .string()
  .required("Campo requerido")
  .max(12, "Máximo de 12 caracteres")
  .trim("No debe dejar campos en blanco")
  .test("test-name", "Rut inválido", (value) => checkRut(value))
    .test("validarSiExisteRut", "Este rut ya fue registrado", async (value) => {
      // el false activa el error
      let condicion = true;

      const getRutUsu = await llamadaApi.post("/userMantenedor/buscarRut", { value });
      if (getRutUsu.data.length === 1) {
        condicion = false;
      } else {
        condicion = true;
      }
      return condicion;
    }),
    nombre:yup.string().required('Nombre es requerido'),  
    empresa:yup.string().required('Empresa es requerido'),  
    ctto:yup.string().required('contrato es requerido'),
    apellidoPaterno:yup.string().required('apellido paterno es requerido'),
    apellidoMaterno:yup.string().required('apellido materno es requerido'),
    email:yup.string().required('email es requerido'),   
  })
  


export const FormBase = () => {
  const queryClient = useQueryClient()
  const {data:empresasData, isLoading}=useQuery('getEmpresas',()=>getEmpresas())
  const [rutEmpre, setRutEmpre] = useState('')
  const {data:contratos, isLoading:isLoadingCttos}=useQuery(['getCttos',rutEmpre],()=>getContratos(rutEmpre))
 
  const { mutate } = useMutation(saveDataForm);

useEffect(() => {
  queryClient.invalidateQueries('getCttos') 
}, [rutEmpre,queryClient])


    const {handleSubmit,control, formState:{errors},setValue,reset} = useForm({
        defaultValues:{
            /* rut:'', */
            nombre:'',           
          /*   apellidoPaterno:'',
            apellidoMaterno:'',
            empresa:'',
            ctto:'',
            email:'',
            archivos: null */
        },
        resolver: yupResolver(validar)
        
    })

    const functionSubmit=(values)=>{
         mutate(values)
         console.log('values')
         reset()
    }

  return (
    <form onSubmit={handleSubmit(functionSubmit)}>
        <Grid container spacing={2}>
        <Grid item md={2} xs={12}>
         {/*      <TextField
                name="rut"
                label="Rut"
                autoComplete='off'
                onChangeCapture={(e)=>{                       
                  setValue('rut',e.target.value)
              }}
              size='small'
              fullWidth
              error
            
              />  */}
            {/* <Controller
               name='rut'
               control={control}
               render={({field})=>(
                <FormControl fullWidth>
                    <TextField 
                    {...field}
                    autoComplete='off'
                    onChangeCapture={(e)=>{                       
                        setValue('rut',e.target.value)
                    }}
                    label='Rut'
                    size='small'
                    error={Boolean(errors.rut)}
                    helperText={errors.rut && errors.rut.message}
                    />
                </FormControl >
               )}            
            />   */}        
          </Grid>
        <Grid item md={4} xs={12}>

       {/*  <TextField
                name="nombre"
                label="Nombre"
                autoComplete='off'
                onChangeCapture={(e)=>{                       
                  setValue('nombre',e.target.value)
              }}
              size='small'
              fullWidth
              error
              
              />  */}
      {/*  <Controller
               name='nombre'
               control={control}
               render={({field})=>(
                <FormControl fullWidth>
                    <TextField 
                    {...field}
                    autoComplete='off'
                    onChangeCapture={(e)=>{                       
                        setValue('nombre',e.target.value)
                    }}
                    label='Nombre'
                    size='small'
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre && errors.nombre.message}
                    />
                </FormControl >
               )}            
            />      */}      
          </Grid>
          <Grid item md={4} xs={12}>
         
            <InputRhf name='nombre' control={control} setValue={setValue} errors={errors}/>
            
            

     {/*      <TextField
                name="apellidoPaterno"
                label="apellidoPaterno"
                autoComplete='off'
                onChangeCapture={(e)=>{                       
                  setValue('apellidoPaterno',e.target.value)
              }}
              size='small'
              fullWidth
              error
              
              />  */}


            {/* <Controller
               name='apellidoPaterno'
               control={control}
               render={({field})=>(
                <FormControl fullWidth>
                    <TextField 
                    {...field}
                    autoComplete='off'
                    onChangeCapture={(e)=>{                       
                        setValue('apellidoPaterno',e.target.value)
                    }}
                    label='Apellido Paterno'
                    size='small'
                    error={Boolean(errors.apellidoPaterno)}
                    helperText={errors.apellidoPaterno && errors.apellidoPaterno.message}
                    />
                </FormControl >
               )}            
            />   */}        
          </Grid>

       


          <Grid item md={4} xs={12}>
      {/*     <TextField
                name="apellidoMaterno"
                label="apellidoMaterno"
                autoComplete='off'
                onChangeCapture={(e)=>{                       
                  setValue('apellidoMaterno',e.target.value)
              }}
              size='small'
              fullWidth
              error
              
              />  */}
         {/*    <Controller
               name='apellidoMaterno'
               control={control}
               render={({field})=>(
                <FormControl fullWidth>
                    <TextField 
                    {...field}
                    autoComplete='off'
                    onChangeCapture={(e)=>{                       
                        setValue('apellidoMaterno',e.target.value)
                    }}
                    label='Apellido Materno'
                    size='small'
                    error={Boolean(errors.apellidoMaterno)}
                    helperText={errors.apellidoMaterno && errors.apellidoMaterno.message}
                    />
                </FormControl >
               )}            
            />  */}         
          </Grid>


{/*           <Grid item md={3}>
          { 
                              isLoading ? <CircularProgress/>:
                              <SelectRHF name='empresa' data={empresasData}/>
          }
            
            </Grid>  */}

          <Grid item md={3}> 
                   <Controller 
                    name='empresa'
                    control={control}
                    render={({field})=>(
                        <FormControl fullWidth
                        size="small"
                        error={ Boolean(errors.empresa)}
                        > 
                            <InputLabel>Empresa</InputLabel>
                            <Select
                            {...field}  
                            onChange={(res)=>{
                              setValue('empresa',res.target.value)
                              setValue('ctto','')
                              setRutEmpre(res.target.value)
                            }}
                             size='small'         
                             label='Empresa'
                            >
                              { 
                              isLoading ? <CircularProgress/>:
                                empresasData.data.result.map((select) => (
                                    <MenuItem key={select.rut_empre} value={select.rut_empre}>
                                    {select.nom_empre}
                                    </MenuItem>
                                ))
                                
                              }   
                            </Select>
                            <FormHelperText>
                      {errors.empresa && errors.empresa.message}       
                      </FormHelperText>
                      </FormControl>
                      )
                    }                 
                   />
                   </Grid>



                   <Grid item md={3}> 
                   <Controller 
                    name='ctto'
                    control={control}
                    render={({field})=>(
                        <FormControl fullWidth
                        size="small"
                        error={ Boolean(errors.ctto)}
                        > 
                            <InputLabel>Contrato</InputLabel>
                            <Select
                            {...field}  
                             size='small'         
                             label='Contrato'
                            >
                              {
                              isLoadingCttos ? <CircularProgress/>:
                              contratos.data.result.map((select) => (
                                    <MenuItem key={select.num_ctto} value={select.num_ctto}>
                                    {select.num_ctto}
                                    </MenuItem>
                                ))
                               
                              }     
                            </Select>
                            <FormHelperText>
                      {errors.ctto && errors.ctto.message}       
                      </FormHelperText>
                      </FormControl>
                      )
                    }                 
                   />
                   </Grid>

                   <Grid item md={4} xs={12}>
            {/*        <TextField
                name="email"
                label="email"
                autoComplete='off'
                onChangeCapture={(e)=>{                       
                  setValue('email',e.target.value)
              }}
              size='small'
              fullWidth
              error
              
              />  */}
            {/* <Controller
               name='email'
               control={control}
               render={({field})=>(
                <FormControl fullWidth>
                    <TextField 
                    {...field}
                    autoComplete='off'
                    onChangeCapture={(e)=>{                       
                        setValue('email',e.target.value)
                    }}
                    label='E-Mail'
                    size='small'
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                    />
                </FormControl >
               )}            
            />    */}

          </Grid>
          <Grid item md={12} xs={12}>
          <StyledDropzone setValue={setValue}/>
          </Grid>
                    
        </Grid>
        <Grid container mt={2} >
             <Grid item md={12}>
                  <Button type='submit' variant='contained'>Enviar</Button>
             </Grid>
        </Grid>

    </form>
  )
}
