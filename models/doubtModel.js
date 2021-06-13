const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description:{
        type : String,
        required : true
    },
    created_timestamp : {                          
        type : Number,                          
        required : true
    },
    student_id : {
        type : String,
        required : true
    },
    comments : {
        type : Array,
        default : []
    },
    recent_ta_id : {
        type : String,
        default : ''
    },
    recent_ta_accept_timestamp :{
        type : Number,
        default : 0
    },
    resolve_timestamp:{
        type : Number,
        default : 0
    },
    escalate_count : {
        type : Number,
        default : 0
    }
});

const doubtModel = mongoose.model('doubtModel',doubtSchema);
module.exports = doubtModel;