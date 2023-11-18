const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./Config/connect');
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors()) 
const logRoutes = require('./routes/log');
app.use('/log', logRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to database');
    }
    catch (error) {
        console.log(error);
        console.log("Error connecting to database");
    } 
});
 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error!');

});