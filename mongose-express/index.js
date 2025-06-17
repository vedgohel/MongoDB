const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require('./models/chat.js'); 
const methodOverride = require('method-override');


// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extends:true}));
app.use(methodOverride('_method'));


// Mongoose connection
main().then(() => {
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatapp');
}



/*
// Save a chat document (for testing)
let chat1 = new Chat({
    from: "neha",
    to: "priya",
    msg: "send your exam results",
    created_at: new Date(),
});

chat1.save().then((res) => {
    console.log("Chat saved:", res);
}).catch((err) => {
    console.log("Error saving chat:", err);
});
*/



// Routes
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
   res.render("index.ejs",{ chats });
});

app.get("/", (req, res) => {
    res.send("working")
});


// new chats
app.get("/chats/new",(req,res) =>{
     res.render("new.ejs");
});

app.post("/chats" , (req,res) =>{
     let { from , to , msg } =req.body;
     let newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
     });
    newChat.save().then((res)=>{
        console.log("chat was saved");
    }).catch((err) =>{
        console.log(err);
    });
    res.redirect("/chats");
});



// edit route
app.get("/chats/:id/edit", async(req,res) =>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg : newMsg } = req.body;

    await Chat.findByIdAndUpdate(id, { msg: newMsg }, {
        runValidators: true,
        new: true
    });

    res.redirect("/chats");
});

//destory route

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
