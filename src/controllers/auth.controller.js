import { loginUser } from "../services/auth.service.js";
import { createUser, updateUser, deleteUser } from "../services/user.service.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return handleErrorClient(res, 400, "Email y contraseña son requeridos");
    }
    
    const data = await loginUser(email, password);
    handleSuccess(res, 200, "Login exitoso", data);
  } catch (error) {
    handleErrorClient(res, 401, error.message);
  }
}

export async function register(req, res) {
  try {
    const data = req.body;
    
    if (!data.email || !data.password) {
      return handleErrorClient(res, 400, "Email y contraseña son requeridos");
    }
    
    const newUser = await createUser(data);
    delete newUser.password; // Nunca devolver la contraseña
    handleSuccess(res, 201, "Usuario registrado exitosamente", newUser);
  } catch (error) {
    if (error.code === '23505') { // Código de error de PostgreSQL para violación de unique constraint
      handleErrorClient(res, 409, "El email ya está registrado");
    } else {
      handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
  }
}

/* modificar y eliminar perfil*/
export async function updateProfile(req, res) {
  try {
    const userId = req.user.id; 
    const data = req.body;
    const updatedUser = await updateUser(userId, data);
    delete updatedUser.password; // Nunca devolver la contraseña
    handleSuccess(res, 200, "Perfil actualizado exitosamente", updatedUser);
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      handleErrorClient(res, 404, error.message);
    } else {
      handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
  }
}
export async function deleteProfile(req, res) {
  try {
    const userId = req.user.id;
    await deleteUser(userId);
    handleSuccess(res, 200, "Perfil eliminado exitosamente");
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      handleErrorClient(res, 404, error.message);
    } else {
      handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
  }
}
