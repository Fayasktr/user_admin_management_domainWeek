import express from "express";
import uAuth from "../controller/userController.js";
import userAuth from "../middleware/userAuthentic.js";

const router = express.Router()

router.get('/', userAuth.isLogin, uAuth.login)
router.get('/signUp', userAuth.isLogin, uAuth.signUp)
router.post('/signUp', uAuth.signUpUser)
router.post('/login', uAuth.loginUser)
router.get('/home', userAuth.isLogout, uAuth.home)
router.get('/logout', uAuth.logout)




const userRout = router;
export default userRout;