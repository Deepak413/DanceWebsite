const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const { stringify } = require("querystring");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser:true});
const port = 8000;

//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {  };
    res.status(200).render('home.pug', params);               //this .file will be served
})

app.get('/contact', (req, res)=>{
    const params = {  };
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then( ()=>{                                  //before submitting the form make sure start mongod process in admin powershell
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(404).send("item was not saved to database")
    });

    // res.status(200).render('contact.pug',);
})





// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

