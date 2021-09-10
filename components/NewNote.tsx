import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  saveNote: (note: CreateNoteDto) => void;
}

export interface CreateNoteDto {
  title: string;
  content: string;
}

const NewNote = ({ saveNote }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const clickSave = async () => {
    try {
      setIsOpen(false);
      await saveNote({ title: title.trim(), content: content.trim() });
      setTitle("");
      setContent("");
      toast("Saved");
    } catch (e) {
      console.error(e);
      toast.error("Error creating note");
    }
  };

  if (isOpen) {
    return (
      <div className="margin-bottom new-note-container">
        <h3>Crate New Note</h3>
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
            placeholder="content"
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
      <div className="margin-bottom">
        <button onClick={() => setIsOpen(true)}>Create Note</button>
      </div>
    );
  }
};

export default NewNote;
