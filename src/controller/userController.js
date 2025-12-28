import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import user from "../models/userModel.js"



const login = asyncHandler(async (req, res) => {
    res.render('userSide/login')
})
const signUp = asyncHandler(async (req, res) => {
    res.render('userSide/signUp')
})
const home = asyncHandler(async (req, res) => {
    res.render('userSide/home', { name: req.session.user.name });
})


const signUpUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    if (name.trim() == "" || !email || password.trim() == "") {
        res.status(400)
        res.redirect('/signUp')

        throw new Error('please fill all area.. ');
    } else {
        const existUser = await user.findOne({email});
        if(existUser){
            res.status(400);
            return res.render('userSide/signUp', {error: 'User already exist..' })
        }
    }

    const User = await user.create({
        name,
        email,
        password: hashedPassword
    })
        if(User){
        res.render('userSide/login');
        }else{
        res.status(400)
        throw new Error("invalid..")
    }
    console.log(hashedPassword)
    console.log(req.body)
})



const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        return res.render('userSide/login', { error: 'Please fill the all area..' })
    }
    const existUser = await user.findOne({email});
    if (!existUser) {
        res.status(400);
        return res.render('userSide/login', { error: 'User not found...' })
    }
    const checkPass = await bcrypt.compare(password, existUser.password);
    if (!checkPass) {
        res.status(400);
        return res.render('userSide/login', { error: 'Invalid password...' })
    }
    console.log(existUser.isBlocked)
    if(existUser.isBlocked){
        res.status(400);
        return res.render('userSide/login', { error: 'User is blocked...' })
    }

    req.session.user = {
        id: existUser._id,
        name: existUser.name,
        email: existUser.email
    };

    req.session.save((err) => {
        if (err) {
            console.error("Session save error:", err);
            return res.status(500).render('userSide/login', { error: 'Session error' });
        }
        res.redirect('/home');
    });
})

const logout = asyncHandler(async (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

const uAuth = { login, signUp, signUpUser, loginUser, home, logout }
export default uAuth;