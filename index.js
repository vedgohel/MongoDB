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

User.updateOne({name:"vandan"},{age: 25}).then((res)=>{    
    console.log(res)
}) .catch((err) =>{
    console.log(err);
});


/*

/ calling id retrieve data of user
User.findById("685055692fd48aba61c125b1")
 .then((res) =>{
     console.log(res);
    })
    .catch((err)=>{
     console.log(err);
    });


//specific name is print
User.find({ age: { $gt : 25 }})
 .then((res) =>{
     console.log(res[0].name);
    })
    .catch((err)=>{
     console.log(err);
    });


//which are user of age greter then 25 ?
User.find({ age: { $gt : 25 }})
 .then((res) =>{
     console.log(res);
    })
    .catch((err)=>{
     console.log(err);
    });


//find all user data
User.find({}).then((res) =>{
     console.log(res);
    })
    .catch((err)=>{
     console.log(err);
    });

//insertMany
 
User.insertMany([
    {name:"vandan", email: "vandan@gmail.com", age:24},
    {name:"kashish", email: "kashish@gmail.com", age:26},
    {name:"vijay", email: "vijay@gmail.com", age:40},
]).then((res) =>{
    console.log(res);
});


//insertOne
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
  */