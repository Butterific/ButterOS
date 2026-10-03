const noteInput = document.getElementById('noteInput');
const saveNoteButton = document.getElementById('saveNoteButton');
const notesList = document.getElementById('notesList');

function savenotestocache() {
  const notes = [];
  notesList.querySelectorAll('li').forEach((li) => {
    notes.push(li.textContent);
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotesFromCache() {
  const cachedNotes = localStorage.getItem('notes');
  if (!cachedNotes) {
    return;
  }

  const notes = JSON.parse(cachedNotes);
  if (!Array.isArray(notes)) {
    return;
  }

  notes.forEach((note) => {
    const li = document.createElement('li');
    li.textContent = note;
    notesList.appendChild(li);
  });
}

saveNoteButton.addEventListener('click', () => {
  const note = noteInput.value;
  if (note) {
    const li = document.createElement('li');
    li.textContent = note;
    notesList.appendChild(li);
    noteInput.value = '';
    savenotestocache();
  }
});
// assign note ids to each new note for deleting idk
let noteId = 0;
loadNotesFromCache();
