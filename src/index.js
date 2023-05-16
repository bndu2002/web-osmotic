const express = require('express')
const app = express()
const port = 3000
const route = require('./route/route')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

app.use(bodyParser.json())


mongoose.connect("mongodb+srv://vandana:7CJBNDDwPorDTTrX@cluster0.crrs6th.mongodb.net/vandana-db", {
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route)

app.listen(port, () => {
    console.log(`express running on ${port}`)
})



