const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('process.env.MONGODB_URL',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database || No Error"))

app.post("/sign_up",(req,res)=>{
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let gender = req.body.gender;
    let dob = req.body.dob;
    let education = req.body.education;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let nationality = req.body.nationality;
    let state = req.body.state;

    let data = {
        "firstname": firstname,
        "lastname": lastname,
        "gender": gender,
        "dob": dob,
        "education": education,
        "email" : email,
        "phoneNumber": phoneNumber,
        "nationality": nationality,
        "state" : state
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(port);


console.log("App running on PORT 3000");