const { llamadaApi } = require('api/reqApi');

export const datagridDatos = async () => {
    const datagridDatos = await llamadaApi.post('/userMantenedor/datagridDatos');
    return datagridDatos;
};

