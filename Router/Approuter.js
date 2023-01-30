
const express = require("express");
const Authentication = require("../Middleware/Authentication");
const PostModel = require("../Models/PostModel");

const AppRouter = express.Router();

AppRouter.get("/",Authentication,async (req,res)=>{
    try{
        const {query} = req.query;
        
        if(query){
            const filterData = await PostModel.find({device : query})
            const count = await PostModel.countDocuments({device : query})
            return res.send({data : filterData,count : count})
        }
         const data = await PostModel.find();
         const count = await PostModel.countDocuments()
         res.send({data : data,count : count})
    }
    catch(err){
        res.status(404).send("Something went wrong");
    }
})

AppRouter.post("/create",Authentication,async (req,res)=>{
    try{
         const data = await PostModel.create(req.body);
         await data.save();
         res.send({message : "Succesfully Created"})
    }
    catch(err){
        res.status(404).send("Something went wrong");
    }
})

AppRouter.patch("/update/:id",Authentication,async (req,res)=>{
    try{
         const {title,body,device}= req.body;
         const id = req.params.id;
         const updated = await PostModel.findByIdAndUpdate(id,{
            title,body,device
         });
         res.send({message : "Successfully Updated"})

    }
    catch(err){
        res.status(404).send("Something went wrong");
    }
})

AppRouter.delete("/delete/:id",Authentication,async (req,res)=>{
    try{
         const id = req.params.id;
         const deleted = await PostModel.findByIdAndDelete(id);
         res.send({message : "Successfully Deleted"})
    }
    catch(err){
        res.status(404).send("Something went wrong");
    }
})

module.exports = AppRouter;