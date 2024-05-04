const mongoose =require("mongoose");

const connectDb=async()=>{

try {

    const connect=await mongoose.connect(process.env.CONNECTIO_STRING);
    console.log(
        "Database is connceted",
        connect.connection.host,
        connect.connection.name
    )
    
} catch (error) {
    console.log(error)
    process.exit
    
}
};

module.exports=connectDb