const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email_id : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true
    }
});

const studentModel = mongoose.model('studentModel',studentSchema);
module.exports = studentModel;