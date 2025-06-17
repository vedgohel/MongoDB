const mongoose = require('mongoose');

main().then((res)=>{
    console.log("connection successfull"); 
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:20,

    },
    author:{
        type:String,
    },
    price:{
        type:Number,
        min:[1, 'price is too low the amazon selling']
       
    },
    discount:{
        type:Number,
        default:0,
    },
    category:{
        type:String,
        enum: ["fiction","non-fiction"],
    }
});


const Book = mongoose.model("Book",bookSchema);

Book.findByIdAndUpdate("6851273888da130edc02b556", { price:-250 } ,{runValidators:true}) .then((res) => {
   console.log(res)
}) .catch((err)=>{
    console.log(err.errors.price.properties.message)  // this case cmd line  show the message in updation value is low then amazon define the valuue
})



/* 

//book data entry
let Book1 = new Book({
    title:"social-science",
    author:"Rd sharma",
    price:270,
    category:"fiction",
});

Book1.save().then(( res) => {
    console.log(res);
}) .catch((err) =>{
    console.log(err);
})


//category based in enum
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:20,

    },
    author:{
        type:String,
    },
    price:{
        type:Number,
       
    },
    discount:{
        type:Number,
        default:0,
    },
    category:{
        type:String,
        enum: ["fiction","non-fiction"],
    }
});


const Book = mongoose.model("Book",bookSchema);

let Book1 = new Book({
    title:"social-science",
    author:"Rd sharma",
    price:270,
    category:"fiction",
});

Book1.save().then(( res) => {
    console.log(res);
}) .catch((err) =>{
    console.log(err);
})


//maxLength:

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:20,

    },
    author:{
        type:String,
    },
    price:{
        type:Number,
       
    },
    discount:{
        type:Number,
        default:0,
    }
});


const Book = mongoose.model("Book",bookSchema);

let Book1 = new Book({
    title:"science",
    author:"Rd sharma",
    price:270,
});

Book1.save().then(( res) => {
    console.log(res);
}) .catch((err) =>{
    console.log(err);
})


//basic schema of mongoose
const bookSchema = new mongoose.Schema({
    title:string,
    author:stirng
    price:number
});


//simple type and required value of validation 
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    author:{
        type:String,
    },
    price:{
        type:Number,
        default:0,
    },
});


*/
