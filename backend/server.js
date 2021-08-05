const app = require('./app')
const connectDatabase = require('./config/database')

//const dotenv = require('dotenv');
const cloudinary = require('cloudinary')

//handle uncaught exceptions
process.on('uncaughtException',err =>{
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down  due to uncaught exception');
    process.exit(1);
})

//setting up config file
if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').dotenv.config({path:'backend/config/config.env'})



//connecting to database
connectDatabase();

//setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

 const server =app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandle Promise rejections
process.on('unhandledRejection', err =>{
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to unhandled rejection');
    server.close(()=>{
        process.exit(1)

    })
})