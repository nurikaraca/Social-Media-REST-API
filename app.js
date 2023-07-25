const express = require('express')
const app = express();
require('dotenv').config()
const cors =  require('cors')
const helmet= require('helmet')
const  morgan = require('morgan')
const  db = require('./config/db.js')
const bodyParser = require('body-parser')

//routes
const  auth = require('./routes/authRoute.js')
const  post = require('./routes/postRoute.js')

//middleware
app.use(express.json());
app.use(helmet());
app.use(cors())
app.use(morgan("common"));

app.use(bodyParser.json({limit: '30mb' , extended:true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

app.use('/api', auth)
app.use('/api', post)

const port = process.env.PORT
db();
app.listen(port, () =>{
    console.log(`App listining in port ${port} `)
} )


