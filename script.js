document.addEventListener('DOMContentLoaded', (event) => {
    loadNotes();
});

function saveNotes() {
    const notes = document.querySelectorAll('.note p');
    const notesArray = [];
    notes.forEach(note => {
        notesArray.push(note.innerText);
    });
    localStorage.setItem('notes', JSON.stringify(notesArray));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
        notes.forEach(noteText => {
            const note = document.createElement('div');
            note.classList.add('note');

            const noteContent = document.createElement('p');
            noteContent.innerText = noteText;
            noteContent.contentEditable = true;
            note.appendChild(noteContent);

            const timestamp = document.createElement('span');
            timestamp.classList.add('timestamp');
            timestamp.innerText = new Date().toLocaleString();
            note.appendChild(timestamp);

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteBtn.classList.add('delete-btn', 'icon');
            deleteBtn.onclick = function() {
                note.remove();
                saveNotes();
            };
            note.appendChild(deleteBtn);

            const editBtn = document.createElement('button');
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.classList.add('edit-btn', 'icon');
            editBtn.onclick = function() {
                noteContent.focus();
            };
            note.appendChild(editBtn);

            document.getElementById('notesContainer').appendChild(note);
        });
    }
}

function addNote() {
    const noteText = document.getElementById('noteText').value;
    const noteColor = document.getElementById('noteColor').value;
    if (noteText.trim() === "") {
        alert("Note cannot be empty");
        return;
    }

    const note = document.createElement('div');
    note.classList.add('note');
    note.style.backgroundColor = noteColor;

    const noteContent = document.createElement('p');
    noteContent.innerText = noteText;
    noteContent.contentEditable = true;
    note.appendChild(noteContent);

    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.innerText = new Date().toLocaleString();
    note.appendChild(timestamp);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.classList.add('delete-btn', 'icon');
    deleteBtn.onclick = function() {
        note.remove();
        saveNotes();
    };
    note.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.classList.add('edit-btn', 'icon');
    editBtn.onclick = function() {
        noteContent.focus();
    };
    note.appendChild(editBtn);

    document.getElementById('notesContainer').appendChild(note);

    document.getElementById('noteText').value = '';

    saveNotes();
}
