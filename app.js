const yargs = require('yargs');

const notes = require('./note');

// customise yargs version
yargs.version('1.1.0')
//create add command

yargs.command({     
  command: 'add',     
  describe: 'add a new note', 
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }, 
    body: {
      description: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },   
  handler(argv) {
    notes.addNotes(argv.title, argv.body)     
  } 
}) 
 

// yargs.command({
//   command: 'add',
//   describe: 'Add a new note',
//   builder: {
//       title: {
//           describe: 'Note title',
//           demandOption: true,
//           type: 'string'
//       },
//       body: {
//           describe: 'Note body',
//           demandOption: true,
//           type: 'string'
//       }
//   },
//   handler(argv) {
//       notes.addNote(argv.title, argv.body)
//   }
// })

yargs.command({     
  command: 'remove',     
  describe: 'remove a note', 
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },    
  handler(argv) {
    notes.removeNotes(argv.title)     
  }
}) 

yargs.command({     
  command: 'list',     
  describe: 'lists all the notes',     
  handler() {
   notes.listNotes()     
  } 
}) 

yargs.command({     
  command: 'read',     
  describe: 'read a note',    
  builder: {
    title: {
      describe: 'Provide note title to search',
      demandOption: true,
      type: 'string'
    }
  },    
  handler(argv) {
    notes.readNote(argv.title)    
  } 
}) 

console.log(yargs.argv)
