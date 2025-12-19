import asyncHandler from "express-async-handler";


const login =asyncHandler(async (req,res)=>{
    res.render('/login')
})
const signUp =asyncHandler(async (req,res)=>{
    res.render('/signUp')
})
const home =asyncHandler(async (req,res)=>{
    res.render('/home')
})

const uAuth={login,signUp,home}
export default uAuth;