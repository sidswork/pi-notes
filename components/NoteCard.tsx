import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { deleteNote, updateNote, UpdateNoteDto } from "../db/service";

interface Props {
  note: UpdateNoteDto;
}

const NoteCard = ({ note }: Props) => {
  const { id } = note;
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const deleteNoteClick = async (id: number) => {
    try {
      await deleteNote(id);
      toast("Note deleted");
    } catch (e) {
      console.error(e);
      toast.error("Error deleting note");
    }
  };

  const clickSave = async () => {
    try {
      setIsOpen(false);
      await updateNote({
        id: note.id,
        title: title.trim(),
        content: content.trim(),
      });
      toast("Note Updated");
    } catch (e) {
      console.error(e);
      toast.error("Error creating note");
    }
  };

  if (isOpen) {
    return (
      <div className="margin-bottom note-form">
        <h2>Update Note</h2>
        <div className="form-control">
          <input
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          ></input>
        </div>
        <div className="form-control">
          <textarea
            placeholder="content (markdown supported)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button
            disabled={!title.trim() || !content.trim()}
            onClick={clickSave}
          >
            Save
          </button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </div>
    );
  } else {
    return (
      <div key={id} className="note-container">
        <div className="margin-bottom">
          <div>
            <a
              className="note-title animated-rainbow-hover"
              onClick={() => setIsOpen(true)}
            >
              {title}
            </a>
          </div>
          <div className="note-content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
        <div>
          <button className="delete-button" onClick={() => deleteNoteClick(id)}>
            X
          </button>
        </div>
      </div>
    );
  }
};

export default NoteCard;
