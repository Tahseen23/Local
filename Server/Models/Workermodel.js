const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Worker=new Schema({
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
  occupation:{
    type:String,
    required:true
  },
  ratings:{
    type:Number
  },
  location:{
    type:[Number]
  },
  price:{
    type:String,
    required:true
  },
  history:{
    type:[String]
  },
  bio:{
    type:String
  },
  address:{
    type:String,
    required:true
  }
})

const WorkerModel=mongoose.model('worker',Worker)
module.exports=WorkerModel