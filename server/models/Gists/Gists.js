import mongoose from "mongoose";

const gistSchema = new mongoose.Schema({

    gistName:{
        type: String,
        required: true,
    },
    gistDes:{
        type: String,
        required: true
    },
    fileName:{
        type:String,
        required: true
    },
    fileContent:{
        type: String,
    },
    gisturl:{
        type: String,
        required: true
    },
},
{
    timeseries: true
})

const gistModel = mongoose.model("Gist",gistSchema,"gist")

export default gistModel