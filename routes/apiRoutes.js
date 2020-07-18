var noteInput = require("../db/db.json");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = function(app) {

  // GET 
  app.get("/api/notes", function(req, res) {
    res.json(noteInput);
  });

// POST 
  app.post("/api/notes", function(req, res) {
    
    let newNote = req.body;

    let existingID = noteInput[noteInput.length - 1]["id"];
    let newID = existingID + 1;
    newNote["id"] = newID;

    console.log("Req.body:", req.body);
    noteInput.push(newNote);

    writeFileAsync("./db/db.json", JSON.stringify(noteInput)).then(function() {
        console.log("Note Added.");
    });

    res.json(newNote);

  });

// DELETE
  app.delete("/api/notes/:id", function(req, res) {


    let chosenId = parseInt(req.params.id);
    console.log(chosenId);


    for (let i = 0; i < noteInput.length; i++) {
        if (chosenId === noteInput[i].id) {
            
            noteInput.splice(i,1);
            
            let noteJSON = JSON.stringify(noteInput, null, 2);

            writeFileAsync("./db/db.json", noteJSON).then(function() {
            console.log ("Note Deleted.");
        });                 
        }
    }
    res.json(noteInput);
});
    
};

