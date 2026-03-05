// text based AI Chat Controller
import openai from "../configs/openai.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import imagekit from "../configs/imageKit.js";
import axios from "axios";


export const textMesageController = async (req, res) => {

    try{

        const userId=req.user._id;

        // check credits 
        if(req.user.credits<1){
            return res.json({success:false, message:"You don't have enough credits to generate an image"});
        }



        const {chatId,prompt}=req.body;

        // we have the user id and the message and the chat id
        // we need to find the chat and update the messages array
        const chat=await Chat.findOne({userId, _id:chatId});

        chat.messages.push({role:"user", content:prompt,timestamp:Date.now(), isImage:false});
        const {choices} = await openai.chat.completions.create({
              model: "gemini-3-flash-preview",
            messages: [
             
            {
               role: "user",
              content: prompt,
        },
    ],
});

  const reply={...choices[0].message, timestamp:Date.now(), isImage:false};
   res.json({success:true, reply});
  chat.messages.push(reply);

  await chat.save();

//   after generating the response we have to deduct one credit fron the user account
  await User.updateOne({_id:userId}, {$inc:{credits:-1}});

 



    }catch(error){
        return res.json({success:false, message:error.message});
    }       
};

// Image based AI Chat Controller
export const imageMesageController = async (req, res) => {
    try{
        const userId=req.user._id;
        // check credits 
        if(req.user.credits<2){
            return res.json({success:false, message:"You don't have enough credits to generate an image"});
        }

        const {prompt, chatId,isPublished}=req.body;

        // find chat

        const chat=await Chat.findOne({userId, _id:chatId});

        // push the user message to the chat
        chat.messages.push({role:"user", 
            // here we have the prompt using this prompt we have to generate the image
            content:prompt,
            timestamp:Date.now(), 
            isImage:false});


            
            // generate image from openai
            // encode the prompt to base64
            const encodedPrompt=encodeURIComponent(prompt);

            // construct the url for image generation

            const generatedImageUrl=` ${process.env.IMAGEKIT_URL_ENDPOINT}/
            ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800 h-800`;

            // Trigger generation by fetching from ImageKit

            // 1️⃣ Downloading the generated AI image
            // 2️⃣ Converting it to Base64 format    
            // 3️⃣ Uploading it to ImageKit storage


           const aiImageResponse= await axios.get(generatedImageUrl, {responseType:"arraybuffer"});

           console.log(aiImageResponse.data);

        //    convert the response to base64
        const base64Image=`data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString("base64")}`;

        // upload the image to imagekit
        // Now you store the generated image permanently in ImageKit.
        const uploadResponse=await imagekit.upload({
            file:base64Image,
            fileName:`${Date.now()}.png`,
            folder:"quickgpt",
        });

         const reply={
            role:"assistant", 
            content:uploadResponse.url,
             timestamp:Date.now(),
              isImage:true,
              isPublished};


           res.json({success:true, reply});

           chat.messages.push(reply);
              await chat.save();

            //   after generating the response we have to deduct two credit fron the user account

             await User.updateOne({_id:userId}, {$inc:{credits:-2}});

        




    }catch(error){

        res.json({success:false, message:error.message});

    }
};
