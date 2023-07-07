const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:{type:"String"},
    password:{type:"String"},
    number:{type:"String",required:true}
})

const userModal = mongoose.model("user",userSchema)

module.exports = {userModal}
