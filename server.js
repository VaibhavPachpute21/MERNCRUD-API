const express = require('express');
const morgan = require('morgan');
const dotenv=require('dotenv');
const connectDB=require('./config/config');
const cors=require('cors')

connectDB()


const app = express();
dotenv.config();
app.use(cors())

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users/',require('./routes/usersRoutes'));
app.use('/api/pizzas/',require('./routes/pizzaRoute'));
app.use('/api/orders',require("./routes/oderRoutes"))

const PORT=process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})