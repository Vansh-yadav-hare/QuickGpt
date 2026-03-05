import Chat from "../models/Chat.js";

// Api for creating a new chat




export const createChat = async (req, res) => {

    try{

        
         const userId = req.user?._id
    console.log("User Id: ", req.user?._id);

        // now we have the user id and we can create a new chat for this user

        const chatData={
            userId,
            messages:[],
            name:"New Chat",
            userName:req.user.name,
        }

        await Chat.create(chatData);
        res.json({success:true, message:"Chat created successfully"});

    }catch(error){
        return res.json({success:false, message:error.message});
    }
};


// Api to get all chats of a user

export const getChats = async (req, res) => {

    try{

        const userId=req.user._id;

        const chats=await Chat.find({userId}).sort({updatedAt:-1});

        res.json({success:true, chats});

    }catch(error){
        return res.json({success:false, message:error.message});
    }
};

// Api to delete a chat

export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.body;

    await Chat.deleteOne({ _id: chatId, userId });

    res.json({ success: true, message: "Chat deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};