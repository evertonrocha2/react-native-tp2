import * as SQLite from "expo-sqlite";

const createTable = async (table: string) => {
  const db = await SQLite.openDatabaseAsync("project-list");
  await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS ${table} (
            uid INTEGER PRIMARY KEY NOT NULL, 
            email TEXT NOT NULL, 
            displayName TEXT, 
            photoURL TEXT, 
            phoneNumber TEXT , 
            createdAt TEXT NOT NULL, 
            );
        `);
};

const save = async (table: string, data: any) => {
  const db = await SQLite.openDatabaseAsync("project-list");

//   const result = await db.runAsync(
//     `INSERT INTO u${table} (value, intValue) VALUES (?, ?)`,
//     `aaa`,
//     100
//   );
  console.log(data);
};

export { save, createTable };
