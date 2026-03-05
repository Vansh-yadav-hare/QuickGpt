import mongoose from "mongoose";


const ChatSchema = new mongoose.Schema({
    userId :{type:String,ref:'User',required:true},
    userName:{type:String, required:true},
    name:{type:String, required:true},
    messages:[
        {
            isImage:{type:Boolean,required:true},
            isPublished:{type:Boolean,default:false},
            role:{type:String, required:true},
            // role can be user or assistant
            // Ai generated response
            content:{type:String, required:true},
            timestamp:{type:Number,required:true},
        }
    ]
},{timestamps:true});

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
// Now we can store the data in the database