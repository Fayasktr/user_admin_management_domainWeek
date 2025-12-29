import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";


const adminPass = process.env.adminPassword || "1234";
const adminEmail = process.env.adminEmail || 'admin@gmail.com';


const adminDashbord = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.render('adminSide/dashbord', { users });
});

const admin = (req, res) => {
    if (req.session.admin) {
        return res.redirect('/adminSide/dashbord');
    }
    res.render('adminSide/login')
}

const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).render('adminSide/login', { error: 'All fields are required' });
    }
    if (email != adminEmail || password != adminPass) {
        return res.status(401).render('adminSide/login', { error: 'Invalid user name or password' });
    }

    req.session.admin = { email, password };
    res.redirect('/adminSide/dashbord');
});


const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/adminSide/dashbord');
})

const blockUser = asyncHandler(async (req, res) => {

    const { id } = req.params;
    await User.findByIdAndUpdate(id, {isBlocked:true});
    res.redirect('/adminSide/dashbord');
})

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, {isBlocked:false });
    res.redirect('/adminSide/dashbord');
})

const searchUser = asyncHandler(async (req, res) => {
    const { search } = req.query;
    const users = await User.find({ name:{$regex: search.trim(),$options: 'i'}});
    res.render('adminSide/dashbord',{users,search});
});

const createUser=asyncHandler(async (req, res) => {
    console.log('reached crateUser')
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).render('adminSide/createUser', { error: 'All fields are required' });
    }
    const user = await User.create({ name, email, password });
    res.redirect('/adminSide/dashbord');
})

const editUser=asyncHandler(async(req,res)=>{
    const {email}=req.params;
    console.log(req.params)
    const user=await User.findOne({email});
    res.render('adminSide/edit-user',{user});
})

const updateUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const user=await User.findOne({email});
    user.name=name;
    user.email=email;
    user.password=password;
    await user.save();
    res.redirect('/adminSide/dashbord');
})








const adminLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/adminSide/login');
}


const adminController = {
    admin,adminLogin,adminLogout,
    adminDashbord,deleteUser,blockUser,
    unblockUser,searchUser,createUser,
    editUser,updateUser
}
export default adminController;