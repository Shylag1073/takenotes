let express = require("express");
let uniqueID = require("uniqID");
let fs =require("fs");
let path = require("path")
let app=express();
let PORT = 80

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/notes", (req, res) => {
    res.sendFile (path.join(__dirname,"./public/notes.html")) ;
})

app.get("*" , (req, res) => {
    res.sendFile (path.join(__dirname,"./public/index.html")) ;
})



app.post ("/api/notes", (req ,res) => {
    const newNote = req.body;
    let notes = JSON.parse ( fs.readFileSync("./db/db.json"));
    newNote.id = uniqueID();
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
})

// app.delete("/api/notes/:id", (req ,res) => {

//     let newnotes = require('./db/db.json')
// for (let i = 0; i < newnotes.length; i++) {
//     if(newnotes[i].id == req.params.id){
//         newnotes.splice(i, 1)
//     }
//     fs.writeFileSync('./db/db.json', JSON.stringify(newnotes))
//     res.json(newnotes)
    
// }
// })

app.listen(process.env.PORT || PORT, () => {
    console.log('Server Running in http://localhost')
  });


