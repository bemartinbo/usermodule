
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import * as yup from 'yup';
import { useQuery, useQueryClient } from 'react-query';

import { datagridDatos } from 'helpers/traerDatos';
import { PhotoDisplayModal } from './components/PhotoDisplayModal';
import { DeleteModal } from './components/DeleteModal';
import { DownloadModal } from './components/DownloadModal';
import { EditModal } from './components/EditModal';
import { useEffect } from 'react';







const schema = yup.object().shape({   
    prueba: yup.number().positive('Deber ser positivo'),
  });


export const DatagridMuestra = () => {

  const queryClient = useQueryClient();

  const { data: gridData, isLoading: gridisLoading } = useQuery('datagridDatos',datagridDatos);
  
   

    const columns = [
        { field: 'id', headerName: 'Rut', width: 90 },
        {
          field: 'nombre',
          headerName: 'Nombre',
          width: 150,
          editable: false,
        },
        {
          field: 'apellidoPaterno',
          headerName: 'Apellido P',
          width: 150,
          editable: false,
        },
        {
          field: 'apellidoMaterno',
          headerName: 'Apellido M',
          width: 150,
          editable: false,
        },
        {
          field: 'empresa',
          headerName: 'Empresa',
          width: 110,
          editable: false,
        
        },
        {
          field: 'ctto',       
          headerName: 'Contrato',
          width: 110,
          editable: false,
        
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 110,
          editable: false,
        
        },
        {
          field: 'opciones',
          headerName: 'opciones',
          width: 190,
          editable: false,
          renderCell: (rows) => <> <PhotoDisplayModal rows={rows} />  <DeleteModal rows={rows} /> <DownloadModal rows={rows} /> <EditModal rows={rows}/> </>     
        },
      ];


const onCellEditCommit =(cellData,event)=>{  
   schema.validate({prueba:cellData.value}).then((resp)=>{       
    console.log(resp)  
 }).catch((error)=>{
    console.log('mal')
    console.log(event) 
  
 })
}

  return (

   <Box sx={{ height: 400, width: '100%' }}>

       {!gridisLoading?
       <DataGrid
       rows={gridData.data.result}
       columns={columns}
       pageSize={10}
       rowsPerPageOptions={[10]}       
       onCellEditCommit={onCellEditCommit}        
       disableSelectionOnClick
       experimentalFeatures={{ newEditingApi: true }}
     /> 
       :
       null
       }
    </Box>
  )
}
