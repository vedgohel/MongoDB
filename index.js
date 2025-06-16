const mongoose = require('mongoose');

main().then((res)=>{
    console.log("connection successfull"); 
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/school');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number
});

const User = mongoose.model("User",userSchema);



const user1 = new User ({ 
    name: "radhi",
    email:"radhi@gmail.com",
    age:25,
 });

 user1.save().then( (res) =>{
    console.log(res);
  })
  .catch( (err) =>{ 
    console.log(err); 
  });