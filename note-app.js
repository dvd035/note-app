//prevent local leakage
'user strict'

let notes = getSavedNotes()

const filters ={
    searchText : '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#search-bar').addEventListener('input', (e) =>{
    filters.searchText = e.target.value
    renderNotes(notes, filters)

})

document.querySelector('#new-note').addEventListener('click',(e) =>{
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id : id,
        title : '',
        body : '',
        createdAt : timestamp,
        updatedAt : timestamp 
    })
    saveNotes(notes)
    location.assign(`/note-app/edit.html#${id}`)
})

document.querySelector('#filter-by').addEventListener('change',(e) =>{
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})
   
//syncing data across pages
window.addEventListener('storage', (e) =>{
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})
  
