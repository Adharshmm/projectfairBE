const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then((res)=>{
    console.log('MongoDb successfully connected');
    
})
.catch((err)=>{
    console.log("MongoDb connection failed")
    console.log(err)
})