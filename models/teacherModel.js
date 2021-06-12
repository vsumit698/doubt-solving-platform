const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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

const teacherModel = mongoose.model('teacherModel',teacherSchema);
module.exports = teacherModel;