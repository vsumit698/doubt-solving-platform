const mongoose = require('mongoose');

const taSchema = new mongoose.Schema({
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
    },
    doubt_accept_count : {
        type : Number,
        default : 0
    },
    doubt_resolve_count : {
        type: Number,
        default : 0
    },
    doubt_escalated_count : {
        type : Number,
        default : 0
    },
    avg_doubt_activity_time : {
        type : Number,
        default : 0
    }
});

const taModel = mongoose.model('taModel',taSchema);
module.exports = taModel;