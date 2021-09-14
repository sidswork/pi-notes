import sqlite3 from "better-sqlite3";
import { Note } from "./Note";

const db = sqlite3("notes.db");

export const db_findAllNotes = (): Note[] => {
  const stmt = db.prepare("SELECT * FROM note");
  const notes = stmt.all();

  return notes.map((n) => {
    return {
      id: parseInt(n.id),
      title: n.title.toString(),
      content: n.content.toString(),
    };
  });
};

export const db_deleteNote = (id: number): void => {
  const stmt = db.prepare("DELETE FROM note WHERE id=?");
  stmt.run(id);
};

export const db_createNote = (title: string, content: string): number => {
  const stmt = db.prepare("INSERT INTO note (title, content) VALUES (?,?)");
  const res = stmt.run(title, content);
  return parseInt(res.lastInsertRowid.toString());
};

export const db_updateNote = (
  id: number,
  title: string,
  content: string
): number => {
  const stmt = db.prepare("UPDATE  note SET title=?, content=? WHERE id=?");
  stmt.run(title, content, id);
  return id;
};

export default db;
