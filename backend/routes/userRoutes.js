const express=require('express')
const {authUser,registerUser,allUsers}=require("../controllers/userControllers");
const {protect}=require("../middleware/authMiddleware")

const router=express.Router();

// the protect middleware ensures that only logged in users can access this route
router.route("/").post(registerUser).get(protect,allUsers);
router.post("/login", authUser);

module.exports=router;
