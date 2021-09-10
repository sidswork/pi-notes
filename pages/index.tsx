import type { GetServerSideProps, NextPage } from "next";
import Router from "next/router";
import NewNote, { CreateNoteDto } from "../components/NewNote";
import NotesList from "../components/NotesList";
import { ToastContainer } from "react-toastify";
import { findAllNotes } from "../db/connection";
import { Note } from "../db/Note";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  notes: Note[];
}

const Home: NextPage<Props> = ({ notes }) => {
  return (
    <div className="view-wrapper">
      <h1>PI Notes</h1>
      <NewNote saveNote={saveNote} />
      <NotesList notes={notes} deleteNote={deleteNote} />
      <ToastContainer autoClose={2500} theme="dark" />
    </div>
  );
};

async function saveNote(note: CreateNoteDto): Promise<void> {
  await fetch(`/api/note`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  await Router.push("/");
}

async function deleteNote(id: number): Promise<void> {
  await fetch(`/api/note/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = findAllNotes();
  return { props: { notes } };
};

export default Home;
