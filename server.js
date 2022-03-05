let express = require("express");
let uniqueID = require("uniqID");
let fs =require("fs");
let path = require("path")
let app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/db/db.json"));
});

app.get("/notes", (req, res) => {
    res.sendFile (path.join(__dirname,"./Develop/public/notes.html")) ;
})

app.get("*" , (req, res) => {
    res.sendFile (path.join(__dirname,"./Develop/public/index.html")) ;
})

app.post ("/api/notes", (req ,res) => {
    const newNote = req.body;
    const notes = JSON.parse ( fs.readFileSync("./Develop/db/db.json"));
    newNote.id = uniqueID();
    notes.push(newNote);
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes));
    res.json(notes);
})

app.listen(process.env.PORT || 3009, () => {
    console.log('Server Running in Port 3001')
  });


