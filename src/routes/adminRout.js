import express from "express";
import adminController from "../controller/adminController.js";
import adminAuthentic from "../middleware/adminAuthentic.js";


const router =express.Router();

router.get('/adminSide/login',adminController.admin)
router.post('/adminSide/login',adminController.adminLogin)
router.get('/adminSide/dashbord',adminAuthentic.isLogin,adminController.adminDashbord);
router.get('/adminSide/logout',adminController.adminLogout)

router.get('/adminSide/delete-user/:id',adminController.deleteUser)
router.get('/adminSide/block-user/:id',adminController.blockUser)
router.get('/adminSide/unblock-user/:id',adminController.unblockUser)
router.get('/adminSide/search-users',adminController.searchUser)
router.post('/adminSide/create-user', adminController.createUser)
router.get('/adminSide/edit-user/:id', adminController.editUser)
router.post('/adminSide/edit-user/:id', adminController.updateUser)


const adminRout=router;
export default adminRout;
