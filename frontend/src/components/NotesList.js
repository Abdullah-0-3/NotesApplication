import React, { useEffect, useState } from 'react';
import { fetchNotes, deleteNote } from '../api/api';

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const response = await fetchNotes();
    setNotes(response.data);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;