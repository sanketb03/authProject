require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/authRoutes')
const dataRoutes = require('./routes/dataRoutes')
const mongoose = require('mongoose')
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET", "POST"], 
    credentials: true
}));

app.use('/api/user', userRoutes)
app.use('/api', dataRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })