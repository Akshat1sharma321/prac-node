import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, logInUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoveerImage } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router() ;

router.route("/register").post(
    upload.fields([{
        name : "avatar" , 
        maxCount : 1
    },{
        name : "coverImage" , 
        maxCount : 1
    }]) ,
    registerUser)


router.route("/login").post(logInUser)

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT , changeCurrentPassword)

router.route("/current-user").get(verifyJWT , getCurrentUser)


//post se saari details update hojayengi to hame bas thodi si karni hai isliye use patch


router.route("/update-account").patch(verifyJWT , updateAccountDetails)

router.route("/avatar").patch(verifyJWT , upload.single("avatar") , updateUserAvatar) 

router.route("/cover-image").patch(verifyJWT , upload.single("coverImage") , updateUserCoveerImage)

router.route("/c/:username").get(verifyJWT , getUserChannelProfile)

router.route("/history").get(verifyJWT , getWatchHistory)

// we use next so that we will not be confused to run which method 1st and which method later like here  verifyJWT will be run 1st and then logoutUser will take place 
export default router ; 