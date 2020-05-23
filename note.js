const fs = require('fs');
const chalk = require('chalk')
const getNotes = () => {
  return 'Your notes ...'
}

const addNotes = (title, body) => {
  const notes = loadNotes()

  const duplicateNote = notes.find(note => note.title === title)
  if(!duplicateNote) 
  {
    notes.push({
      title,
      body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New Note Added'))
  } else {
    console.log(chalk.green.inverse('Note title taken!'))
  }  
  
}

const removeNotes = (title) => {
  const notes = loadNotes()
  if(Object.keys(notes).length > 0){
    const duplicateNote = notes.filter(note=> note.title === title)
    if(duplicateNote.length > 0) {
      const removedNote = notes.filter(note => note.title !== title)
      const removedNoteJSON = JSON.stringify(removedNote)
      fs.writeFileSync('notes.json', removedNoteJSON)
      console.log(chalk.bgGreen('Note removed sucessfully'))
    } else {
      console.log(chalk.bgRed('This title is not included in the note and cannot be removed'))
    }
  } else {
    console.log(chalk.bgRed('There is not enough note to be removed. Add more notes'))
  }

}

const listNotes = () => {
  const notes =loadNotes()
  if(notes.length > 0) {
    console.log(chalk.bgGreen('You notes..'));
    notes.forEach(note => console.log(`Note Title: ${note.title}`))
  } else {
    console.log(chalk.bgRed('Add notes to see the list'))
  }
  
}

const readNote = (title) => {
  const notes = loadNotes()
  if(notes.length > 0) {
    const note = notes.find(note => note.title.toLowerCase().includes(title))
    if(note){
      console.log(chalk.bgGreenBright.black(`Note title: ${note.title}`))
      console.log(`Note body: ${note.body}`)
    } else {
      console.log(chalk.bgRed(`Sorry there was no note found with the title`))
    }
    
  } else {
    console.log(chalk.bgRed(`There is no note to read`))
  }
  
}
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    return []
  }
 
}
module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNote: readNote
}