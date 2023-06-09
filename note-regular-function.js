//reading existing note from local storage
const getSavedNotes = function(){
    const notesJSON = localStorage.getItem('notes')

    if(notesJSON !== null){
        return JSON.parse(notesJSON)
    }else{
       return []
    }
}

//save notes to local storage
const saveNotes = function(notes){
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove a note from list
const removeNote =function(id){
     const noteIndex = notes.findIndex(function(note){
        return note.id === id
     })

     if(noteIndex >-1){
        notes.splice(noteIndex,1)
     }

}

//generate DOM structure for note
const generateNoteDOM = function(note){
    const noteDiv = document.createElement('div')
    const showText = document.createElement('a')
    const button = document.createElement('button')

    //setup remove note button
    button.textContent='x'
    noteDiv.appendChild(button)
    button.addEventListener('click',function(){
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
const sortNotes = function(notes, sortBy){
    if(sortBy === 'byEdited'){
        return notes.sort(function(a, b){
            if(a.updatedAt > b.updatedAt){
                return -1
            }else if(a.updatedAt < b.updatedAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === 'byCreated'){
        return notes.sort(function(a, b){
            if(a.createdAt > b.createdAt){
                return -1
            }else if(a.createdAt < b.createdAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === 'alphabetical'){
        return notes.sort(function(a, b){
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
const renderNotes = function(notes, filters){
    notes = sortNotes(notes, filters.sortBy)
    let filteredNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    console.log(filteredNotes);

    document.querySelector('#notes').innerHTML=''

    filteredNotes.forEach(function(note){
    document.querySelector('#notes').appendChild(generateNoteDOM(note))
})
}

//generate the last edited message
const generateLastEdited = function(timestamp){
    return `last edited ${moment(note.updatedAt).fromNow()}`
}