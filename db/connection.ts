import sqlite3 from "better-sqlite3";
import { Note } from "./Note";

const db = sqlite3("notes.db");

export const findAllNotes = (): Note[] => {
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

export const deleteNote = (id: number): void => {
  const stmt = db.prepare("DELETE FROM note WHERE id=?");
  stmt.run(id);
};

export const createNote = (title: string, content: string): number => {
  const stmt = db.prepare("INSERT INTO note (title, content) VALUES (?,?)");
  const res = stmt.run(title, content);
  return parseInt(res.lastInsertRowid.toString());
};

export default db;
