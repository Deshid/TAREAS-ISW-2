import axios from './root.service.js';

export async function getProfile() {
    try {
        const response = await axios.get('/profile/private');
        return response.data;
    } catch (error) {
        return error.response?.data || { message: 'Error al obtener perfil' };
    }
}

    export const updateProfile = async (profileData) => {
    try {
        const response = await axios.patch('/profile/private', profileData);
        return response.data;
    } catch (error) {
        return error.response?.data || { message: 'Error al actualizar perfil' };
    }
    };

export const deleteProfile = async () => {
    try {
        const response = await axios.delete('/profile/private');
        return response.data;
    } catch (error) {
        return error.response?.data || { message: 'Error al eliminar perfil' };
    }
};