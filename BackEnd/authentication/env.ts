// APP
export const APP_PORT = process.env.APP_PORT || 4000;
export const APP_NAME = process.env.APP_NAME || '';
// DATABASE
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = Number(process.env.DB_PORT || 3306);
export const DB_DATABASE = process.env.DB_DATABASE || "";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "root";
// JWT TOKEN
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_DURATION = process.env.JWT_DURATION || "2h";