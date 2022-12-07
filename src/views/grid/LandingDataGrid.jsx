import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import { DatagridMuestra } from './DatagridMuestra'


export const LandingDataGrid = () => {
console.log('')
  return (
    <>
    <MainCard title="Listado de Usuarios">      
        <DatagridMuestra/>
    </MainCard>
    
    </>
  )
}
