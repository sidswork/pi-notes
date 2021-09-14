import Router from "next/router";

export interface CreateNoteDto {
  title: string;
  content: string;
}

export interface UpdateNoteDto {
  id: number;
  title: string;
  content: string;
}

export async function saveNote(note: CreateNoteDto): Promise<void> {
  await fetch(`/api/note`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  await Router.push("/");
}

export async function updateNote(note: UpdateNoteDto): Promise<void> {
  await fetch(`/api/note/${note.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  await Router.push("/");
}

export async function deleteNote(id: number): Promise<void> {
  await fetch(`/api/note/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}
