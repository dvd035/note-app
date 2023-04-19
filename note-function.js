//prevent local leakage
'user strict'


//reading existing note from local storage
const getSavedNotes = () =>{
    const notesJSON = localStorage.getItem('notes')

    //to handle any error in data received from local storage
    try{
        //if notesJSON !== null
        return notesJSON ? JSON.parse(notesJSON) : []
    }catch(e){
        return []
    }
}

//save notes to local storage
const saveNotes = (notes) =>{
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove a note from list
const removeNote =(id) =>{
     const noteIndex = notes.findIndex((note)=> note.id === id)

     if(noteIndex >-1){
        notes.splice(noteIndex,1)
     }

}

//generate DOM structure for note
const generateNoteDOM = (note) =>{
    const noteDiv = document.createElement('div')
    const showText = document.createElement('a')
    const button = document.createElement('button')

    //setup remove note button
    button.textContent='x'
    noteDiv.appendChild(button)
    button.addEventListener('click',() =>{
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    //setup note title text
    if(note.title.length > 0){
        showText.textContent = note.title
    }else{
        showText.textContent = 'Untitled Note'
    }

    showText.setAttribute('href', `/note-app/edit.html#${note.id}`)
    noteDiv.appendChild(showText)
    return noteDiv
}

//sorting function
const sortNotes = (notes, sortBy) =>{
    if(sortBy === 'byEdited'){
        return notes.sort((a, b) =>{
            if(a.updatedAt > b.updatedAt){
                return -1
            }else if(a.updatedAt < b.updatedAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === 'byCreated'){
        return notes.sort((a, b) =>{
            if(a.createdAt > b.createdAt){
                return -1
            }else if(a.createdAt < b.createdAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === 'alphabetical'){
        return notes.sort((a, b) =>{
            if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }else if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }else{
                return 0
            }
        }) 
    }else{
        return notes
    }
} 

// render application notes
const renderNotes = (notes, filters) =>{
    notes = sortNotes(notes, filters.sortBy)
    let filteredNotes = notes.filter((note) =>note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    console.log(filteredNotes);

    document.querySelector('#notes').innerHTML=''

    filteredNotes.forEach((note) =>{
    document.querySelector('#notes').appendChild(generateNoteDOM(note))
})
}

//generate the last edited message
const generateLastEdited = (timestamp) =>{
    return `last edited ${moment(note.updatedAt).fromNow()}`
}