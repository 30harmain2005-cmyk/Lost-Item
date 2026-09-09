const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
var methodOverride = require('method-override')

let port = process.env.PORT||8080;

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let items = [
    {
        id: uuidv4(),
        name: "Black Backpack",
        location: "College Library",
        description: "Black backpack with a blue keychain",
        contact: "Ayesha",
        claimed: false
    },
    {
        id: uuidv4(),
        name: "An umbrella",
        location: "Auditorium",
        description: "A blue colour umbrella with white flowers in it",
        contact: "Ayesha",
        claimed: false
    },
    {
        id: uuidv4(),
        name: "A mouse",
        location: "Computer Lab",
        description: "A black mouse wired-less",
        contact: "Ayesha",
        claimed: false
    }
];

app.get("/items", (req, res) => {
    res.render("index.ejs", { items });
});

app.post("/items", (req, res) => {
    let {id, name, location, description, contact, claimed} = req.body;
    let newItem = {
        id: uuidv4(),
        name: name,
        location: location,
        description: description,
        contact: contact,
        claimed: claimed === 'on'
    }

    items.push(newItem);
    res.redirect("/items");
});

app.get("/items/:id", (req, res) => {
    let {id} = req.params;
    let item = items.find((p) => p.id === id);
    res.render("new.ejs", { item });
});

app.patch("/items/:id", (req, res) => {
    let {id} = req.params;
    let item = items.find((p) => p.id === id);
    let {location, description, contact} = req.body;
    item.location = location;
    item.description = description;
    item.contact = contact;
    res.redirect("/items");   
});

app.get("/items/:id/edit", (req, res) => {
    let {id} =req.params;
    let item = items.find((p) => p.id === id);
    res.render("edit.ejs", { item });
});

app.delete("/items/:id", (req, res) => {
    let {id} =req.params;
    items = items.filter((p) => p.id !== id);
    res.redirect("/items");
});

app.listen(port, () => {
    console.log("Listening to port: 8080");
});