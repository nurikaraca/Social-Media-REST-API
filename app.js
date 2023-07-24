const express = require('express')
const app = express();
require('dotenv').config()
const helmet= require('helmet')
const  morgan = require('morgan')

const port = process.env.PORT

app.listen(port, () =>{
    console.log(`App listining in port ${port} `)
} )


