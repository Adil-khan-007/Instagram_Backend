const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
     title : String,
     body : String,
     device : String
},{
    timestamps : true
})

const PostModel = mongoose.model("Post",PostSchema);

module.exports = PostModel;