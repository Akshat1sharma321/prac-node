 import { APiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


 const registerUser = asyncHandler(async(req , res) => {
    res.status(200).json({
        message : "ok"
    })

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

    const existedUser = User.findOne({
        $or : [{username}, {email}]
    })

    if(existedUser){
        throw new APiError(409 , "User already existed")
    }

   const avatarLocalPath =  req.files?.avatar[0]?.path ; 
   const coverImagelocalPath = req.files?.coverImage[0]?.path ; 

   if(!avatarLocalPath){
    throw new APiError(400 , "Avatar file is required")
   } ; 

  
   const avatar  = await uploadOnCloudinary(avatarLocalPath)

   const coverImage = await uploadOnCloudinary(coverImagelocalPath);

   if(!avatar){
    throw new APiError(400 , "Avatar file is required")
   }

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


 export {registerUser}