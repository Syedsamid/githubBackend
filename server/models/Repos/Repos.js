import mongoose from "mongoose";

const reposSchema = new mongoose.Schema({

    repoName: {
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    keywords:{
        type: String,
    },
    branch:{
        type: String,
        required: true
    },
    url:{
        type: String
    },
},
{
    timestamps: true,
}
)

const repoModel = mongoose.model("Repos",reposSchema,"repos");

export default repoModel;