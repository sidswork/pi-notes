import React, { useState } from "react";
import { toast } from "react-toastify";
import { Note } from "../db/Note";

interface Props {
  notes: Note[];
  deleteNote: (id: number) => void;
}

const NotesList = ({ notes, deleteNote }: Props) => {
  const deleteNoteClick = async (id: number) => {
    try {
      await deleteNote(id);
      toast("Note deleted");
    } catch (e) {
      console.error(e);
      toast.error("Error deleting note");
    }
  };

  if (!notes.length) {
    return <div>Create a note to get started</div>;
  }

  return (
    <div className="margin-bottom">
      {notes
        .sort((a, b) => b.id - a.id)
        .map((n) => {
          return (
            <div key={n.id} className="note-container">
              <div className="margin-bottom">
                <h3 className="note-title">{n.title}</h3>
                <div className="note-content">{n.content}</div>
              </div>
              <div
                className="delete-button"
                onClick={() => deleteNoteClick(n.id)}
              >
                X
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default NotesList;
