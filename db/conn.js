const mongoose = require('mongoose')
const url ="mongodb://127.0.0.1:27017/demo1"

mongoose.connect(url)
.then(()=>{
    console.log('DB connected.!');
})
.catch((error)=>{
    console.log(error);
})