const mongoose = require('mongoose');
const Schema=moongose.Schema;


const noteSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    tags: {
        type:[String],
        default:[],
    },
    isPinned: {
        type: Boolean,
        default:false,
    },
    userId : {
        type:String,
        required:true,
    },
    createdOn : {
        type:Date,
        default:new Date().getTime(),
    },
});

module.exports=moongose.model("Note",noteSchema);