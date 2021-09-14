import type { NextApiRequest, NextApiResponse } from "next";
import { db_deleteNote, db_updateNote } from "../../../db/connection";
import { Note } from "../../../db/Note";

interface NotFound {
  message: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Note | NotFound>
) {
  if (req.method === "DELETE") {
    const id = req.query.id;

    db_deleteNote(parseInt(id.toString()));

    console.info("LOG: note deleted with id " + id);
    res.status(200).send({ message: "deleted" });
  } else if (req.method === "PUT") {
    const id = req.query.id;
    const { title, content } = req.body;
    db_updateNote(parseInt(id.toString()), title, content);

    console.info("LOG: note updated with id " + id);
    res.status(200).send({ message: "updated" });
  } else {
    res.status(400).send({ message: "Only PUT/DELETE requests allowed" });
  }
}
