import { v2 as cloudinary } from "cloudinary";
import { response } from "express";

import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});


  // Upload an image
//   const uploadResult = await cloudinary.uploader
//     .upload(
//       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//       {
//         public_id: "shoes",
//       }
//     )
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(uploadResult);



  const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null

        const response  = await cloudinary.uploader.upload(localFilePath ,{
            resource_type : "auto"
        })

        console.log("file uploaded" , response.url);
        fs.unlinkSync(localFilePath)
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally save temporary file as the ipload operation got failed 
        return null ;
    }
  }

  export {uploadOnCloudinary}
 