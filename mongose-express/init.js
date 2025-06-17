const mongoose = require('mongoose');
const Chat = require('./models/chat.js'); // ✅ Reuse the defined model

main().then(() => {
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatapp');
}

// Dummy data
let allChats = [
    {
        from: "harsh",
        to: "mona",
        msg: "hey",
        created_at: new Date(),
    },
    {
        from: "mona",
        to: "harsh",
        msg: "how are you?",
        created_at: new Date(),
    },
];

// Insert data
Chat.insertMany(allChats)
    .then((res) => {
        console.log("Chats inserted:", res);
    })
    .catch((err) => {
        console.log("Error inserting chats:", err);
    });
