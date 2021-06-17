const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); // for loading .env file keys in to process.env

const db = require('./config/mongoose');

const passport = require('passport');
const passportJWT = require('./config/passport-JWT');
const bodyParser = require('body-parser');

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

// adding middlewares of passport
app.use(passport.initialize());
app.use(passport.session());

// for removing cors policy
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use('/',require('./routes/doubtSolving'));

if ( process.env.NODE_ENV == "production"){

    app.use(express.static("frontend/build"));

    // const path = require("path");

    // app.get("*", (req, res) => {

    //     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));

    // })

}

const port = process.env.PORT || process.env.app_server_port;

app.listen(port,function(error){
    if(error) {
        console.log(`Error in running server ${error}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
}); 

module.exports = app;