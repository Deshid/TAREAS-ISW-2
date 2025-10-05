"use strict";
import dotenv from "dotenv";

dotenv.config();
// Debug: mostrar todas las variables de entorno relevantes
console.log("[DEBUG][configEnv] HOST:", process.env.HOST);
console.log("[DEBUG][configEnv] DB_HOST:", process.env.DB_HOST);
console.log("[DEBUG][configEnv] DB_PORT:", process.env.DB_PORT);
console.log("[DEBUG][configEnv] DB_USERNAME:", process.env.DB_USERNAME);
console.log("[DEBUG][configEnv] DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("[DEBUG][configEnv] DATABASE:", process.env.DATABASE);
console.log("[DEBUG][configEnv] PORT:", process.env.PORT);

export const HOST = process.env.DB_HOST || process.env.HOST || "localhost";
export const PORT = process.env.PORT || 3000;
export const DB_PORT = process.env.DB_PORT || 5432;
export const DB_USERNAME = process.env.DB_USERNAME;
export const PASSWORD = process.env.DB_PASSWORD;
export const DATABASE = process.env.DATABASE;
export const JWT_SECRET = process.env.JWT_SECRET;
export const cookieKey = process.env.COOKIE_KEY;