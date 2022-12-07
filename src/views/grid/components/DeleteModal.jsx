import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Grid, IconButton } from '@mui/material';
import { useState,useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteUser } from 'helpers/deleteUser';

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

export const DeleteModal = ({ rows }) => {
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = useState('');
    const queryClient = useQueryClient();
    const {mutate} = useMutation(deleteUser,{
      onSuccess: (res ) =>{
       if (res.data.result.changedRows > 0) {
        /* console.log('eliminar existoso exitoso') */
        queryClient.invalidateQueries('datagridDatos')
      } else{
        /* console.log('no se pudo eliminar') */
      } 
      }
    })
  

    const handleOpen = () => {
      setOpen(true);
      setDeleteId(rows.id);
  };

  const functionSubmit = () =>{
    mutate(deleteId)
    setOpen(false)
  }

  const handleClose = () =>{
    setOpen(false);
  } 

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <DeleteForeverIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Grid container spacing={1}>
                        <Grid item md={6} xs={12}>
                            <Typography variant="h4">Eliminar Usuario</Typography>
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <Typography variant="subtilte1">¿Está seguro que desea eliminar el usuario?.</Typography>
                        </Grid>
                    </Grid>

                    <Button onClick={handleClose} variant='contained' >Cancelar</Button>
                    <Button onClick={functionSubmit} variant='contained' color='error'>
                    Eliminar
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};
