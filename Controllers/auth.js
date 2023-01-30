
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");
require("dotenv").config();

const generateToken = (user)=>{
    const {email,name,gender} = user;
   return  jwt.sign({email,name,gender},process.env.SECRET);
}

const register = async (req,res)=>{
    try{
        const {email,password,name,gender} = req.body;

    if(!email || !password || !name){
       return res.status(500).send({message : "name, email and password are mandatory"})
    }

    const exist = await UserModel.findOne({email});

    if(exist){
       return res.status(404).send({message : "User with this email already exist"})
    }

    const user = await UserModel.create({name,email,password,gender});

      res.send({message : "Registration Succesfully"})
    }
    catch(err){
       return res.status(500).send({message : "Something went wrong"} )
    }

}

const login = async (req,res)=>{
    try{
        const {email,password} = req.body;

    if(!email || !password){
       return res.status(500).send({message : "Email and password are mandotory"})
    }

    const user = await UserModel.findOne({email});

    if(!user){
       return res.status(401).send({message : "User not exist with this credentials"})
    }
     
    const token = generateToken(user);
    const {name,gender} = user

    return res.send({
        token : token,
        data : {name,gender,email}
    })

    }
    catch(err){
       return res.status(500).send({message : "Something went wrong"} )
    }
}

module.exports = {
    register,
    login
}