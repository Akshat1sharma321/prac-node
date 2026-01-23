import dotenv from "dotenv"

import mongoose from 'mongoose' 
import { DB_NAME } from './constants.js';
import connectDB from './db/index.js';

dotenv.config({
    path : './env'
})


connectDB().then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server is running at port :  ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("error avgaya" ,  ErrorEvent);
    
}) ; 



/*
import express from 'express'

const app  = express()
;(async ()=>{
try {
    await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);
    app.on("error",(error)=>{
        console.log("Errrr" , error);
        
    })

    app.listen(process.env.PORT , ()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
        
    })
} catch (error) {
    console.log("Error : " ,error);
    throw err
}
})
*/