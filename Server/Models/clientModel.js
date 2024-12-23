const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Client=new Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
    unique:true

  },
  email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true,
    unique:true
  },
  image:{
    type:String
  },
  location:{
    type:[Number]
  },
  
  history:{
    type:[String]
  },
  address:{
    type:String,
    required:true
  }
})

const ClientModel=mongoose.model('client',Client)
module.exports=ClientModel