import express from "express";
import gistModel from "../../models/Gists/Gists.js";
const router = express.Router()


router.post("/create",async(req,res)=>{
    try {
        let userData = req.body
        await gistModel.create(userData);
        res.status(200).json({msg: "Gist created successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/getone/:id",async(req,res)=>{
    try {
        let gistId = req.params.id;
        let getAllGist = await gistModel.find({_id:gistId})
        res.status(200).json({msg:getAllGist})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/getall",async(req,res)=>{
    try {
        let getAll = await gistModel.find({})
        res.status(200).json({msg:getAll})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.put("/update/:id",async(req,res)=>{
    try {
        let gistId = req.params.id;
        let gistData = req.body;
        await gistModel.updateOne({_id:gistId},{$set:gistData})
        res.status(200).json({msg:"update Gists"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


router.delete("/delete/:id",async(req,res)=>{
    try {
        let gistId = req.params.id;
        await gistModel.deleteOne({_id:gistId})
        res.status(200).json({msg:"delete one Gist"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/deleteAll",async(req,res)=>{
    try {
        await gistModel.deleteMany({})
        res.status(200).json({msg:"delete all Gists"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


export default router