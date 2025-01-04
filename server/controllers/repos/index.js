import express from "express";
import repoModel from "../../models/Repos/Repos.js";

const router = express.Router()

router.post("/create",async(req,res)=>{
    try {
        let userData = req.body
        await repoModel.create(userData);
        res.status(200).json({msg: "Repo created successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/getone/:id",async(req,res)=>{
    try {
        let userId = req.params.id;
        let getAllrepo = await repoModel.find({_id:userId})
        res.status(200).json({msg:getAllrepo})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/getall",async(req,res)=>{
    try {
        let getall = await repoModel.find({})
        res.status(200).json({msg:getall})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.put("/update/:id",async(req,res)=>{
    try {
        let repoId = req.params.id;
        let repoData = req.body;
        await repoModel.updateOne({_id:repoId},{$set:repoData})
        res.status(200).json({msg:"update Repository"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


router.delete("/delete/:id",async(req,res)=>{
    try {
        let repoId = req.params.id;
        await repoModel.deleteOne({_id:repoId})
        res.status(200).json({msg:"delete one Repository"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/deleteAll",async(req,res)=>{
    try {
        await repoModel.deleteMany({})
        res.status(200).json({msg:"delete all Repository"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

export default router