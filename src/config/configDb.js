"use strict";
import dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, HOST, PASSWORD, DB_PORT } from "./configEnv.js";
import { User } from "../entities/user.entity.js";
// Debug: mostrar los valores de conexión

console.log("[DEBUG] Parámetros de conexión:");
console.log("HOST:", HOST);
console.log("PORT:", DB_PORT);
console.log("USERNAME:", DB_USERNAME);
console.log("PASSWORD:", PASSWORD);
console.log("DATABASE:", DATABASE);

if (typeof DB_PORT === "undefined" || DB_PORT === null) {
  throw new Error("DB_PORT no está definido. Verifica tu archivo .env y la carga de variables.");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: [User],
  synchronize: true, 
  logging: false,
});

export async function connectDB() {
  try {
    await AppDataSource.initialize();
    console.log("=> Conexión exitosa a la base de datos PostgreSQL!");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}