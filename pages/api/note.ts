import type { NextApiRequest, NextApiResponse } from "next";
import { db_createNote } from "../../db/connection";
import { Note } from "../../db/Note";

interface NotFound {
  message: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Note | NotFound>
) {
  if (req.method === "POST") {
    const { title, content } = req.body;
    const id = db_createNote(title, content);
    console.info("LOG: note created with id " + id);
    res.status(200).json({ id, title, content });
  } else {
    res.status(400).send({ message: "Only POST requests allowed" });
  }
}
