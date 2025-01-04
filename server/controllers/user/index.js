import express from "express";
import config from "config";
import userModel from "../../models/User/User.js";

const router = express.Router()

router.get("/getone/:id",async(req,res)=>{
    try {
        let userId = req.params.id;
        let getAlluser = await userModel.findOne({_id:userId})
        res.status(200).json({msg:getAlluser})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/getall",async(req,res)=>{
    try {
        let getAll = await userModel.find({})

        res.status(200).json({getAll})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.put("/:id",async(req,res)=>{
    try {
        let userId = req.params.id;
        let userData = req.body;
        await userModel.updateOne({_id:userId},{$set:userData})
        res.status(200).json({msg:"update user"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


router.delete("/delete/:id",async(req,res)=>{
    try {
        let userId = req.params.id;
        await userModel.deleteOne({_id:userId})
        res.status(200).json({msg:"deleted one user"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/deleteAll",async(req,res)=>{
    try {
        await userModel.deleteMany({})
        res.status(200).json({msg:"delete all user"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

export default router
