 import { APiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"


 const generateRefreshAndAccessToken = async(userId) =>{
    try {
        const user  = await User.findById(userId)
        const refreshToken = user.generateRefreshtoken();
        const accessToken = user.generateAccesstoken();
        user.refreshToken = refreshToken ; 
        await user.save({validateBeforeSave : false}) ; 
        return {accessToken , refreshToken} ; 

        // accesstoken ko hamne database me save bhi kardiya and referesh token bhi generate kardiya 
    } catch (error) {
        throw new APiError(407 , "SOmething went wrong in generating")
    }
 }

 const registerUser = asyncHandler(async(req , res) => {
    // res.status(200).json({
    //     message : "ok"
    // })

    const {fullname , email , password , username} = req.body ;
    console.log("Email :" , email);

    // if(fullname === ""){
    //     throw new APiError(400 , "Full name required")
    // }

    if(
        [fullname , email , username , password].some((field)=>field?.trim()==="")
    ){
        throw new APiError(400 , "All fields are required")
    }

    const existedUser = await User.findOne({
        $or : [{username}, {email}]
    })

    if(existedUser){
        throw new APiError(409 , "User already existed")
    }

   const avatarLocalPath =  req.files?.avatar[0]?.path ; 
//    const coverImagelocalPath = req.files?.coverImage[0]?.path ; 

    let coverImagelocalPath; 
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImagelocalPath = req.files?.coverImage[0]?.path
    }

   if(!avatarLocalPath){
    throw new APiError(400 , "Avatar file is required")
   } ; 

  
   const avatar  = await uploadOnCloudinary(avatarLocalPath)

   const coverImage = await uploadOnCloudinary(coverImagelocalPath);

   if(!avatar){
    throw new APiError(400 , "Avatar file is required")
   }

   console.log("Avatar upload response:", avatar);


   const user  = await User.create({
    fullname , 
    avatar : avatar.url , 
    coverImage : coverImage?.url || "" , 
    email , 
    password , 
    username : username.toLowerCase()
   })
    
  const createdUser  = await  User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new APiError(500 , "Something went wrong while making the user")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser , "User register Successfully")
  )  

 })


 const logInUser = asyncHandler(async(req , res) =>{
    //get the username and password from the user 
    // verify them in the backend 
    // if found return validated 
    // if password wrong return wrong password 
    // if user not found return false 
    // generate access and refresh token
    // send cookie 
    // return response
    console.log(req.body);
     

    const {username  , password , email} = req.body 

    if(!email && !username){
        throw new APiError(408 , "Username or password is required ")
    }

    const user  =  await User.findOne(
        {
            $or : [{username} , {email}]
        }
    )

    if(!user){
        throw new APiError(409 , "User not found first create the account register")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new APiError(409 , "Enter the correct password")
    }

   const {refreshToken , accessToken} = await generateRefreshAndAccessToken(user._id) ; 

   const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

   const options  = {
    httpOnly : true , 
    secure : true
   }

   return res.status(200)
   .cookie("accessToken" , accessToken , options)
   .cookie("refreshToken" , refreshToken , options)
   .json(
    new ApiResponse(
        200 , 
        {
            user : loggedInUser , accessToken , refreshToken
        } , 
        "User logged in succcessfully"
    )
   )

 })

// how to logout the user we should get the form while logging out 

const logoutUser  = asyncHandler(async(req , res)=>{
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );


    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200)
    .clearCookie("accessToken" , options)
    .clearCookie("refresfToken" , options)
    .json(new ApiResponse(200 , {} , "User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async(req ,res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken 
    if(!incomingRefreshToken){
        throw new APiError(401 , "unauthorized request")
    }

   try {
     const decodedToken  = jwt.verify(
         incomingRefreshToken , 
         process.env.REFRESH_TOKEN_SECRET
     )
     const user  = await User.findById(decodedToken?._id)
 
     if(!user){
         throw new APiError(500 , "Invalid refresh token ")
     }
 
    if(incomingRefreshToken !== user?.refreshToken){
     throw new APiError(401 , "Refresh token expired")
    } 
 
    const options = { 
     httpOnly : true , 
     secure : true
    }
 
    const {accessToken , newrefreshToken} = await generateRefreshAndAccessToken(user._id)
 
    return res 
    .status(200)
    .cookie("accessToken",accessToken)
    .cookie("refreshToken", newrefreshToken)
    .json(
     new ApiResponse(200 , {accessToken , incomingRefreshToken , newrefreshToken },"Access Token Refresh")
    )
   } catch (error) {
    throw new APiError(500 , "Some error in refreshing the token")
   }
})

 export {
    registerUser , 
    logInUser , 
    logoutUser , 
    refreshAccessToken
}