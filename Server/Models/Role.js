const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Role=new Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  username:{
    type:String,
    required:true,
    unique:true

  },
  role:{
    type:String,
    required:true
  }
})

const RoleModel=mongoose.model('role',Role)
module.exports=RoleModel