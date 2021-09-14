import type { GetServerSideProps, NextPage } from "next";
import NewNote from "../components/NewNote";
import NotesList from "../components/NotesList";
import { ToastContainer } from "react-toastify";
import { db_findAllNotes } from "../db/connection";
import { Note } from "../db/Note";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  notes: Note[];
}

const Home: NextPage<Props> = ({ notes }) => {
  return (
    <div className="view-wrapper">
      <h1>PI Notes</h1>
      <NewNote />
      <NotesList notes={notes} />
      <ToastContainer autoClose={2500} theme="dark" />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = db_findAllNotes();
  return { props: { notes } };
};

export default Home;
