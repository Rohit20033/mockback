const mongoose = require("mongoose")

const connect = async ()=>{
   return mongoose.connect("mongodb+srv://rohitkumarprajapat303:rohit8331@cluster0.h0nkdzj.mongodb.net/vintagex?retryWrites=true&w=majority")
}
module.exports=connect
