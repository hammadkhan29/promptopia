import mongoose from "mongoose";

let isConnected = false;
export const connectDb = async () =>{
    mongoose.set('strictQuery' , true)
    if (isConnected){
        console.log('Database is already connected')
        return    
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL , {
            dbName:'cluster0',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
        console.log('MongoDB connected')
    }catch(error){
        console.log('Could not connect to db' , error)
    }
}