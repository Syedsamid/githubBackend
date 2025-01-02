import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    role_type:{
        type:String,
        required: true
    },
    user_view_type:{
        type: String,
        required: true,
    },
    site_admin:{
        type:String,
        default: false,
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    company:{
        type: String,
        required:true
    },
    blog:{
        type: String,
    },
    location:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    hireable:{
        type: Boolean,
        required:true
    },
    bio:{
        type: String,
    },
    twitter_username:{
        type: String,
        required:true
    },
    followers:{
        type: Number,
        required:true
    },
    following:{
        type: Number,
        required:true
    },
    userVerified: {
        email: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: Boolean,
          default: false,
        },
      },
      userVerifyToken: {
        email: {
          type: String,
  
        },
        phone: {
          type: String,
  
        },
      },
    },
{
    timestamps: true,
}
);

const userModel = mongoose.model ("users",userSchema,"User")

export default userModel;