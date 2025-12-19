import express from "express";
import uAuth from "../controller/userController.js";

const router = express.Router()

router.get('/signUp', uAuth.signUp)
router.get('/login', uAuth.login)

const userRout = router;
export default userRout;