const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()
mongoose.set('strictQuery', false);


const connectDB = async () => {
    try {
        const SERVER = process.env.MONGO_URI;
        console.log((SERVER))
        const conn = await mongoose.connect(SERVER,{
            useNewUrlParser: true,
            
        });

        console.log(`connected at ${conn.connection.host}`)
    } catch (error) {
        console.log(`${error.message}`)

    }
}

module.exports = connectDB;
