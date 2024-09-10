import * as SQLite from "expo-sqlite";

const createTableUser = async () => {
  const db = await SQLite.openDatabaseAsync("project-list");
  await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS user (
            uid TEXT PRIMARY KEY NOT NULL, 
            email TEXT NOT NULL, 
            displayName TEXT, 
            photoURL TEXT, 
            phoneNumber TEXT, 
            createdAt TEXT NOT NULL, 
            emailVerified TEXT,
            username TEXT
            );
        `);
  console.log("Tabela criada com sucesso!");
};

const select = async (table: string, columns: string[], where: string) => {
  try {
    const db = await SQLite.openDatabaseAsync("project-list");
    const columnString = columns.join(", ");
    const whereString =
      where !== "" && where !== null && where !== undefined ? `${where}` : "";

    const query: string = `SELECT  ${columnString} FROM ${table} WHERE ${whereString}`;
    console.log(query);
    return await db.getFirstAsync(query);
  } catch (e) {
    console.log(e);
  }
};

const dropTable = async (table: string) => {
  const db = await SQLite.openDatabaseAsync("project-list");
  await db.execAsync(`
            DROP TABLE ${table} ;
        `);
  console.log("Tabela deletada com sucesso!");
};

const save = async (table: string, data: any) => {
  try {
    const db = await SQLite.openDatabaseAsync("project-list");
    const values = Object.values(data).filter((v) => v !== "");

    const keys = Object.keys(data);

    const columns = keys.filter((k) => data[k] !== "").join(", ");

    const interrogations = values
      .filter((v) => v !== "")
      .map(() => "?")
      .join(", ");

    const query = `INSERT INTO ${table} (${columns}) VALUES (${interrogations})`;

    await db.runAsync(query, values);
  } catch (e) {
    console.log(e);
  }
};

export { save, createTableUser, dropTable, select };
