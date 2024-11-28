import React, { useState } from 'react';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';

function App() {
  const [notesChanged, setNotesChanged] = useState(false);

  return (
    <div>
      <NoteForm onNoteAdded={() => setNotesChanged(!notesChanged)} />
      <NotesList key={notesChanged} />
    </div>
  );
}

export default App;