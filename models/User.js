const mongoose = require('mongoose');

const userScehma = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})


const User = mongoose.model('user',userScehma)


module.exports = User;