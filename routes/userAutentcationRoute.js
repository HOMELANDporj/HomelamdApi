const express=require("express")

const router=express.Router()

router.post("/register",(req,res)=>{
    res.json({message:"registred"})
})

router.post("/login",(req,res)=>{
    res.json({message:"Log in user"})
})

router.post("/current",(req,res)=>{
    res.json({message:"current user info"})
})

module.exports=router