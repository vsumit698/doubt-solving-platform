const mongoose = require('mongoose');

const uri = process.env.db_host;

if ( process.env.NODE_ENV == "production"){
    uri = process.env.DB_HOST;
}

mongoose.connect(uri, { useNewUrlParser: true ,useUnifiedTopology:true });

const db = mongoose.connection;

// checking if error occurs or not

db.on('error', console.error.bind(console,"error occured during connection"));

// if no errors occured while setup it will fire 'open' event once...

db.once('open',function(){
    console.log("database is successfully connected........");
});

module.exports = db;