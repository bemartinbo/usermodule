import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState,useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { editUser } from 'helpers/editUser';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getContratos, getEmpresas } from 'helpers/general';

const validar = yup.object().shape({
    rut: yup.string().required('Campo requerido').max(12, 'Máximo de 12 caracteres').trim('No debe dejar campos en blanco'),
    nombre: yup.string().required('Nombre es requerido'),
    empresa: yup.string().required('Empresa es requerido'),
    ctto: yup.string().required('contrato es requerido'),
    apellidoPaterno: yup.string().required('apellido paterno es requerido'),
    apellidoMaterno: yup.string().required('apellido materno es requerido'),
    email: yup.string().required('email es requerido')
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export const EditModal = ({ rows }) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState('');
    const { data: empresasData, isLoading } = useQuery('getEmpresas', () => getEmpresas());
    const [rutEmpre, setRutEmpre] = useState(rows.row.empresa);

    const { data: contratos, isLoading: isLoadingCttos } = useQuery(['getCttos', rutEmpre], () => getContratos(rutEmpre));
    
    const { mutate } = useMutation(editUser,{
      onSuccess: (res) => {
          if (res.data.result.affectedRows > 0) {
              /* console.log('insert exitoso'); */
              queryClient.invalidateQueries('datagridDatos')
          } else {
              console.log('no se pudo guardar');
          } 
          
      }
  });

  const handleOpen = () => {
    setOpen(true);
    setEditId(rows.id);
};
const handleClose = () => {
    setOpen(false);
};



    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        defaultValues: {
            rut: rows.row.id,
            nombre: rows.row.nombre,
            apellidoPaterno: rows.row.apellidoPaterno,
            apellidoMaterno: rows.row.apellidoMaterno,
            empresa: rows.row.empresa,
            ctto: rows.row.ctto,
            email: rows.row.email
        },
        resolver: yupResolver(validar)
    });



    const functionSubmit = (values) =>{
      mutate(values)
      setOpen(false)
    }
    


    return (
        <div>
            <IconButton onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <form onSubmit={handleSubmit(functionSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <Typography variant="h4">Eliminar Usuario</Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Controller
                                name="rut"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <TextField
                                            {...field}
                                            disabled
                                            autoComplete="off"
                                            onChangeCapture={(e) => {
                                                setValue('rut', e.target.value);
                                            }}
                                            label="Rut"
                                            size="small"
                                            error={Boolean(errors.rut)}
                                            helperText={errors.rut && errors.rut.message}
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Controller
                                name="nombre"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <TextField
                                            {...field}
                                            autoComplete="off"
                                            onChangeCapture={(e) => {
                                                setValue('nombre', e.target.value);
                                            }}
                                            label="nombre"
                                            size="small"
                                            error={Boolean(errors.nombre)}
                                            helperText={errors.nombre && errors.nombre.message}
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Controller
                                name="apellidoPaterno"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <TextField
                                            {...field}
                                            autoComplete="off"
                                            onChangeCapture={(e) => {
                                                setValue('apellidoPaterno', e.target.value);
                                            }}
                                            label="apellidoPaterno"
                                            size="small"
                                            error={Boolean(errors.apellidoPaterno)}
                                            helperText={errors.apellidoPaterno && errors.apellidoPaterno.message}
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Controller
                                name="apellidoMaterno"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <TextField
                                            {...field}
                                            autoComplete="off"
                                            onChangeCapture={(e) => {
                                                setValue('apellidoMaterno', e.target.value);
                                            }}
                                            label="apellidoMaterno"
                                            size="small"
                                            error={Boolean(errors.apellidoMaterno)}
                                            helperText={errors.apellidoMaterno && errors.apellidoMaterno.message}
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid item md={12}>
                            <Controller
                                name="empresa"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth size="small" error={Boolean(errors.empresa)}>
                                        <InputLabel>Empresa</InputLabel>
                                        <Select
                                            {...field}
                                            onChange={(res) => {
                                                setValue('empresa', res.target.value);
                                                setValue('ctto', '');
                                                setRutEmpre(res.target.value);
                                            }}
                                            size="small"
                                            label="Empresa"
                                        >
                                            {isLoading ? (
                                                <CircularProgress />
                                            ) : (
                                                empresasData.data.result.map((select) => (
                                                    <MenuItem key={select.rut_empre} value={select.rut_empre}>
                                                        {select.nom_empre}
                                                    </MenuItem>
                                                ))
                                            )}
                                        </Select>
                                        <FormHelperText>{errors.empresa && errors.empresa.message}</FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>

                        <Grid item md={12}>
                            <Controller
                                name="ctto"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth size="small" error={Boolean(errors.ctto)}>
                                        <InputLabel>Contrato</InputLabel>
                                        <Select {...field} size="small" label="Contrato">
                                            {isLoadingCttos ? (
                                                <CircularProgress />
                                            ) : (
                                                contratos.data.result.map((select) => (
                                                    <MenuItem key={select.num_ctto} value={select.num_ctto}>
                                                        {select.num_ctto}
                                                    </MenuItem>
                                                ))
                                            )}
                                        </Select>
                                        <FormHelperText>{errors.ctto && errors.ctto.message}</FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <TextField
                                            {...field}
                                            autoComplete="off"
                                            onChangeCapture={(e) => {
                                                setValue('email', e.target.value);
                                            }}
                                            label="E-Mail"
                                            size="small"
                                            error={Boolean(errors.email)}
                                            helperText={errors.email && errors.email.message}
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid container mt={2} >
                  <Grid item md={12}>
                  <Button 
                  type='submit'
                  variant='contained'
                   >Enviar Button</Button>
                  </Grid>
                  </Grid>
                    </Grid>
                </form>
                </Box>
            </Modal>
        </div>
    );
};
