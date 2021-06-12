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
        type : String,                          
        required : true
    },
    student_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'studentModel',
        required : true
    },
    comments : {
        type : Array,
        default : []
    },
    recent_ta_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'taModel'
    },
    recent_ta_accept_timestamp :{
        type : String,
        default : ''
    },
    resolve_timestamp:{
        type : String,
        default : ''
    },
    escalate_count : {
        type : Number,
        default : 0
    }
});

const doubtModel = mongoose.model('doubtModel',doubtSchema);
module.exports = doubtModel;