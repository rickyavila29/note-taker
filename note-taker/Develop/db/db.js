const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read(note) {
      return readFileAsync('db/db.json', 'utf8');
    };
  
    write(note) {
      return writeFileAsync('db/db.json', JSON.stringify(note));
    };
  
    getNotes() {
      return this.read().then((notes) => {
        let addedNotes;
  
        // If notes isn't an array or can't be turned into one, send back a new empty array
        try {
          addedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
          addedNotes = [];
        }
  
        return addedNotes;
      });
    }
  
    createNote(note) {
      const { title, text } = note;
  
      if (!title || !text) {
        throw new Error("error");
      }
  
      // Get all notes, add the new note, write all the updated notes, return the newNote
      return this.getNotes()
        .then((notes) => 
        [...notes, newNote])
        
        .then((updatedNotes) => 
        this.write(updatedNotes))
       
        .then(() => 
        newNote);
    }
  
    removeNote(id) {
      // Get all notes, remove the note with the given id, write the filtered notes
      return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
  }
  
  module.exports = new Store();
  