const { llamadaApi } = require('api/reqApi');

export const editUser = async (values) => {
    const { rut,nombre,apellidoPaterno,apellidoMaterno,empresa,ctto,email } = values;
    const formData = new FormData();
    formData.append('rut',rut)
    formData.append('nombre',nombre)
    formData.append('apellidoPaterno',apellidoPaterno)
    formData.append('apellidoMaterno',apellidoMaterno)
    formData.append('empresa',empresa)
    formData.append('ctto',ctto)
    formData.append('email',email)

    
    const editUser = await llamadaApi.post('/userMantenedor/editUser',values);
    return editUser;
};