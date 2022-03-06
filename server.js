let express = require("express");
let uniqueID = require("uniqID");
let fs =require("fs");
let path = require("path")
let app=express();
let PORT = 80


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/notes", (req, res) => {
    res.sendFile (path.join(__dirname,"./public/notes.html")) ;
})

app.get("*" , (req, res) => {
    res.sendFile (path.join(__dirname,"./public/index.html")) ;
})

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
    res.json(path.join(__dirname, "./db/db.json"));
});

app.post ("/api/notes", (req ,res) => {
    const newNote = req.body;
    const notes = JSON.parse ( fs.readFileSync("./db/db.json"));
    newNote.id = uniqueID();
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
})

app.listen(process.env.PORT || PORT, () => {
    console.log('Server Running in http://localhost')
  });


