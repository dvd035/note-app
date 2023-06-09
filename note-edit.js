//prevent local leakage
'user strict'

const titleElement = document.querySelector('#note-title')
const bodyElement =  document.querySelector('#note-body')
const buttonElement =  document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')


const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

//if(note === undefined){
if(!note){
    location.assign('/note-app/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

titleElement.addEventListener('input',(e) =>{
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input',(e) =>{
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

buttonElement.addEventListener('click',(e) =>{
    removeNote(note.id)
    saveNotes(notes) 
    location.assign('/note-app/index.html')
})

window.addEventListener('storage', (e) =>{
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)
        
        //if(note === undefined){
        if(!note){
            location.assign('/note-app/index.html')
        }
        
        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = generateLastEdited(note.updatedAt)
    }
})