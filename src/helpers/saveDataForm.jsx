const { llamadaApi } = require('api/reqApi');

export const saveDataForm = async (values) => {
     const { archivos,rut,nombre,apellidoPaterno,apellidoMaterno,empresa,ctto,email } = values; 
    const formData = new FormData();
    for (let i = 0; i < archivos.length; i += 1) {
        formData.append('archivos', archivos[i]);
    }
    formData.append('rut',rut)
    formData.append('nombre',nombre)
    formData.append('apellidoPaterno',apellidoPaterno)
    formData.append('apellidoMaterno',apellidoMaterno)
    formData.append('empresa',empresa)
    formData.append('ctto',ctto)
    formData.append('email',email)
    formData.append('ruta',archivos[0].path)

    const saveDataForm = await llamadaApi.post('/userMantenedor/saveDataForm',formData);

    return saveDataForm;
};
