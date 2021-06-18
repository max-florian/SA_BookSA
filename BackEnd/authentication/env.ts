// APP
export const APP_PORT = process.env.PORT || 4000;
export const APP_NAME = process.env.APP_NAME || '';
// DATABASE
export const DB_HOST = process.env.MYSQL_HOST || "localhost";
export const DB_PORT = Number(process.env.MYSQL_PORT || 3306);
export const DB_DATABASE = process.env.MYSQL_DATABASE || "";
export const DB_USER = process.env.MYSQL_USERNAME || "root";
export const DB_PASSWORD = process.env.MYSQL_PASSWORD || "root";
// JWT TOKEN
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const JWT_DURATION = process.env.JWT_DURATION || "2h";