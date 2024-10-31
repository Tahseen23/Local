const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
require('./Models/db.js')
const route=require('./routes/route.js')

const PORT=process.env.PORT || 8080


app.get('/ping',(req,res)=>{
  res.send('Hello')
})

app.use(bodyParser.json())
app.use(cors())


app.use('/auth',route)

app.listen(PORT,()=>{
  console.log('Server is Running')
})