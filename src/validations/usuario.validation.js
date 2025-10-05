"use strict";
import Joi from "joi";

export const usuarioQueryValidation = Joi.object({
  nombre: Joi.string().min(2).max(100).messages({
    "string.base": "El nombre debe ser de tipo string.",
    "string.min": "El nombre debe tener como mínimo 2 caracteres.",
    "string.max": "El nombre debe tener como máximo 100 caracteres.",
  }),
    apellido: Joi.string().min(2).max(100).messages({
    "string.base": "El apellido debe ser de tipo string.",
    "string.min": "El apellido debe tener como mínimo 2 caracteres.",
    "string.max": "El apellido debe tener como máximo 100 caracteres.",
    }),
    email: Joi.string().min(15).max(35).email().messages({
    "string.base": "El correo electrónico debe ser de tipo string.",
    "string.email": "El correo electrónico debe tener un formato válido.",
    "string.min": "El correo electrónico debe tener como mínimo 15 caracteres.",
    "string.max": "El correo electrónico debe tener como máximo 35 caracteres.",
    }),
    password: Joi.string()
    .min(8)
    .max(26)
    .pattern(/^[a-zA-Z0-9]+$/)
    .messages({
      "string.base": "La contraseña debe ser de tipo string.",
        "string.min": "La contraseña debe tener como mínimo 8 caracteres.",
        "string.max": "La contraseña debe tener como máximo 26 caracteres.",
        "string.pattern.base":
        "La contraseña solo puede contener letras y números.",
    })
});

export const usuarioBodyValidation = Joi.object({
  nombre: Joi.string().min(2).max(100).messages({
    "string.empty": "El nombre no puede estar vacío.",
    "string.base": "El nombre debe ser de tipo string.",
    "string.min": "El nombre debe tener como mínimo 2 caracteres.",
    "string.max": "El nombre debe tener como máximo 100 caracteres.",
  }),
  apellido: Joi.string().min(2).max(100).messages({
    "string.empty": "El apellido no puede estar vacío.",
    "string.base": "El apellido debe ser de tipo string.",
    "string.min": "El apellido debe tener como mínimo 2 caracteres.",
    "string.max": "El apellido debe tener como máximo 100 caracteres.",
  }),
  email: Joi.string().min(15).max(35).email().messages({
    "string.empty": "El correo electrónico no puede estar vacío.",
    "string.base": "El correo electrónico debe ser de tipo string.",
    "string.email": "El correo electrónico debe tener un formato válido.",
    "string.min": "El correo electrónico debe tener como mínimo 15 caracteres.",
    "string.max": "El correo electrónico debe tener como máximo 35 caracteres.",
  }),
  rut: Joi.string()
    .min(9)
    .max(12)
    .pattern(
      /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/
    )
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener como mínimo 9 caracteres.",
      "string.max": "El rut debe tener como máximo 12 caracteres.",
      "string.pattern.base":
        "Formato rut inválido, debe ser xx.xxx.xxx-x o xxxxxxxx-x.",
    }),
  password: Joi.string()
    .min(8)
    .max(26)
    .pattern(/^[a-zA-Z0-9]+$/)
    .messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "string.base": "La contraseña debe ser de tipo string.",
      "string.min": "La contraseña debe tener como mínimo 8 caracteres.",
      "string.max": "La contraseña debe tener como máximo 26 caracteres.",
      "string.pattern.base":
        "La contraseña solo puede contener letras y números.",
    }),
  newPassword: Joi.string()
    .min(8)
    .max(26)
    .allow("")
    .pattern(/^[a-zA-Z0-9]+$/)
    .messages({
      "string.empty": "La nueva contraseña no puede estar vacía.",
      "string.base": "La nueva contraseña debe ser de tipo string.",
      "string.min": "La nueva contraseña debe tener como mínimo 8 caracteres.",
      "string.max": "La nueva contraseña debe tener como máximo 26 caracteres.",
      "string.pattern.base":
        "La nueva contraseña solo puede contener letras y números.",
    }),
});