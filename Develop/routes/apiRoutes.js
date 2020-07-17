const noteInput = require("../db/db.json");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = function(app) {

    //GET
  
    app.get("/api/notes", function(req, res) {
      res.json(noteInput);
    });
  
  
    //POST
  
    app.post("/api/notes", function(req, res) {

      let newNote = req.body;
  
      let existingId = noteInput[noteInput.length - 1]["id"];
      let newId = existingId + 1;
      newNote["id"] = newId;
  
      console.log("Req.body:", req.body);
      noteInput.push(newNote);
  
      writeFileAsync("./db/db.json", JSON.stringify(noteInput)).then(function() {
          console.log("You did it!");
      });
  
      res.json(newNote);
  
    });
  
  
  
    //DELETE

    app.delete("/api/notes/:id", function(req, res) {
    
  
      let chosenId = parseInt(req.params.id);
      console.log(chosenId);
  
  
      for (let i = 0; i < notesData.length; i++) {
          if (chosenId === notesData[i].id) {
              notesData.splice(i,1);
              
              let noteJSON = JSON.stringify(notesData, null, 2);
  
              writeFileAsync("./db/db.json", noteJSON).then(function() {
              console.log ("Chosen note has been deleted!");
          });                 
          }
      }
      res.json(notesData);
  });
      
  };