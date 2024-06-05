const mongoose = require('mongoose');

const Connection = async () =>{

    try {

        const connect = await mongoose.connect(process.env.DATABASEURL);

        if(connect){
            console.log("Connected to database Successfully")
        }
        
    } catch (error) {
        console.log("Database connection failed");
        process.exit(0);
    }
}

export default Connection;