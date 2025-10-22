import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { updateUser, deleteUser } from "../services/user.service.js";
import { usuarioQueryValidation, usuarioBodyValidation } from "../validations/usuario.validation.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}

////////////////  MODIFICAR PERFIL //////////////////////
export async function updateProfile(req, res) {
  try {
    const userId = req.user.id;

    const { email, password } = req.query;
    const data = req.body;

    // Validar query
    const { error: queryError } = usuarioQueryValidation.validate({ email, password });
    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message
      );
    }

    // Validar body 
    const { error: bodyError } = usuarioBodyValidation.validate(data);
    if (bodyError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message
      );
    }

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

//////////////// ELIMINAR PERFIL //////////////////////
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
