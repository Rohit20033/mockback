
const express = require("express")
const cors = require("cors")

const connect = require("./config/db")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { userModal } = require("./model/user.model")


const app = express()

app.use(express.json())
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));




app.get("/",(req,res)=>{
   res.send("Welcome")
})

app.post("/signup",async(req,res)=>{
    const {email,password}=req.body
    const existed = await userModal.findOne({email})
    
    if(existed!==null){
        res.send("Email already exits")
    }

    else{
        try {
        bcrypt.hash(password, 4, async function(err, hash) {
            const user = new userModal({email,password:hash})
            await user.save()
            res.send("Signup Completed")
         });
    } catch (error) {
        console.log(error)
        res.send("Somting went worng")
    }
    }
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body

    
        const user = await userModal.find({email})
         if(user.length===0){
            res.send("Create your Account or wrong email")
         }
         if(user.length!==0){
           const hashed_password = user[0].password
           bcrypt.compare(password, hashed_password, function(err, result) {
              if(result){
                const token = jwt.sign({ userId: user[0]._id }, 'shhhhh')
                res.send(token)
              }
              else{
                res.send("Log in failed ! Check your password")
              }
        });
         }
    
})


app.listen(8000,async()=>{

    try {
        await connect()
        console.log("http://localhost:8000")
    } catch (error) {
        console.log(error)
    }
})