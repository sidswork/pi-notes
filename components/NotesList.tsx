import React, { useState } from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { Note } from "../db/Note";
import NoteCard from "./NoteCard";

interface Props {
  notes: Note[];
}

const NotesList = ({ notes }: Props) => {
  if (!notes.length) {
    return <div>Create a note to get started</div>;
  }

  return (
    <div className="margin-bottom">
      {notes
        .sort((a, b) => b.id - a.id)
        .map((n) => {
          return <NoteCard key={n.id} note={n} />;
        })}
    </div>
  );
};

export default NotesList;
