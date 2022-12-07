const { llamadaApi } = require('api/reqApi');

export const deleteUser = async (deleteId) => {
    const deleteUser = await llamadaApi.post('/userMantenedor/deleteUser',{deleteId});
    return deleteUser;
};