import type { NextApiRequest, NextApiResponse } from "next";
import { createNote } from "../../db/connection";
import { Note } from "../../db/Note";

interface NotFound {
  message: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Note | NotFound>
) {
  if (req.method === "POST") {
    console.log(req.body);
    const { title, content } = req.body;
    const id = createNote(title, content);
    console.info("LOG: note created with id " + id);
    res.status(200).json({ id, title, content });
  } else {
    res.status(400).send({ message: "Only POST requests allowed" });
  }
}
