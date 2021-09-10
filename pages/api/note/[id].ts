import type { NextApiRequest, NextApiResponse } from "next";
import { deleteNote } from "../../../db/connection";
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

    deleteNote(parseInt(id.toString()));

    console.info("LOG: note deleted with id " + id);
    res.status(200).send({ message: "deleted" });
  } else {
    res.status(400).send({ message: "Only POST requests allowed" });
  }
}
