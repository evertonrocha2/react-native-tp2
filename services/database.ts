import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

const generateUID = (length: number) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = "";
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * chars.length);
    uid += chars.charAt(random);
  }
  return uid;
};

const createTableUser = async () => {
  if (isWeb) {
    console.warn("EXPO SQLite não é suportado na web.");
    return;
  }
  const db = await SQLite.openDatabaseAsync("project-list");
  await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS user (
            uid TEXT PRIMARY KEY NOT NULL, 
            email TEXT NOT NULL, 
            displayName TEXT, 
            photoURL NULL, 
            phoneNumber TEXT, 
            createdAt TEXT NOT NULL, 
            emailVerified TEXT,
            username TEXT,
            sync INTEGER
            );
        `);
  console.log("Tabela criada com sucesso!");
};

const update = async (table: string, data: any, id: string) => {
  try {
    const db = await SQLite.openDatabaseAsync("project-list");
    const values = Object.values(data).filter((v) => v !== "");

    const keys = Object.keys(data);

    const columns = keys
      .filter((v) => v !== "")
      .map((v, index) => `${v} = ?`)
      .join(", ");

    const query = `UPDATE ${table} SET ${columns.substring(
      0,
      columns.length
    )} where uid = '${id}'`;

    //@ts-ignore
    await db.runAsync(query, values);
    console.log("Dados atualizados com sucesso!");
  } catch (e) {
    console.log(e);
  }
};

const select = async (
  table: string,
  columns: string[],
  where: string,
  many: boolean
) => {
  if (isWeb) {
    console.warn("EXPO SQLite não é suportado na web.");
    return;
  }
  try {
    const columnString: string = columns.join(", ");
    const whereString =
      where !== "" && where !== null && where !== undefined
        ? `where ${where}`
        : "";
    const db = await SQLite.openDatabaseAsync("project-list");
    const query: string = `SELECT ${columnString} FROM ${table} ${whereString};`;

    if (many) {
      return await db.getAllAsync(query);
    }
    return await db.getFirstAsync(query);
  } catch (err) {
    console.error("Error select:", err);
  }
};

const dropTable = async (table: string) => {
  if (isWeb) {
    console.warn("EXPO SQLite não é suportado na web.");
    return;
  }
  const db = await SQLite.openDatabaseAsync("project-list");
  await db.execAsync(`
            DROP TABLE ${table} ;
        `);
  console.log("Tabela deletada com sucesso!");
};

const save = async (table: string, data: any): string => {
  try {
    const db = await SQLite.openDatabaseAsync("project-list");
    if (data.uid === undefined || data.uid === null) {
      data.uid = generateUID(28);
    }
    const values = Object.values(data).filter((v) => v !== "");

    const keys = Object.keys(data);

    const columns = keys.filter((k) => data[k] !== "").join(", ");

    const interrogations = values
      .filter((v) => v !== "")
      .map(() => "?")
      .join(", ");

    const query = `INSERT INTO ${table} (${columns}) VALUES (${interrogations})`;
    //@ts-ignore
    await db.runAsync(query, values);
    return data.uid;
  } catch (e) {
    console.log(e);
  }
};

export { save, createTableUser, dropTable, select, update, generateUID };
