const noteInput = document.getElementById('noteInput');
const saveNoteButton = document.getElementById('saveNoteButton');
const notesList = document.getElementById('notesList');

saveNoteButton.addEventListener('click', () => {
  const note = noteInput.value;
  if (note) {
    const li = document.createElement('li');
    li.textContent = note;
    notesList.appendChild(li);
    noteInput.value = '';
  }
});
