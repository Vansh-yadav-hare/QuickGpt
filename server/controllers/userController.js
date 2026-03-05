import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";




//generate Jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "user already exists",
      });
    }
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
     console.error("FULL ERROR:", error);   
    return res.json({ success: false, message: error.message });
  }
};

//api for login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken(user._id);
        return res.json({ success: true, token });
      }
    }
    return res.json({ success: false, message: "Invalid Email & Password" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Api to get user Data
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Api to get published images

export const getPublishedImages = async (req, res) => {
    try{

      const publishedImageMessages=await Chat.aggregate([
        {$unwind:"$messages"},
        {$match:
          {"messages.isPublished":true,
          "messages.isImage":true,
          }},
          {
            $project:{
              _id:0,
              imageUrl:"$messages.content",
              userName:"$userName",
          }
        },
      ])

      res.json({success:true, Images:publishedImageMessages.reverse()});
       
    }catch(error){
        return res.json({success:false, message:error.message});
    } 
};
