import mongoose from "mongoose";

const Connection = async (username,password) => {
    const URL = `mongodb://${username}:${password}@ac-cgshp3s-shard-00-00.hpcty8c.mongodb.net:27017,ac-cgshp3s-shard-00-01.hpcty8c.mongodb.net:27017,ac-cgshp3s-shard-00-02.hpcty8c.mongodb.net:27017/?ssl=true&replicaSet=atlas-wowmo0-shard-0&authSource=admin&retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL,{ useUnifiedTopology: true, useNewUrlParser: true});
        console.log("database connected successfully");
    } catch (error) {
        console.log(`error while connecting with database `, error.message);
    }
}

export default Connection;
