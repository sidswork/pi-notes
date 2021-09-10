const sqlite3 = require("better-sqlite3");

const db = sqlite3("notes.db");

db.prepare(
  `CREATE TABLE IF NOT EXISTS note (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "title" TEXT NOT NULL,
        "content" TEXT NOT NULL);
    `
).run();
