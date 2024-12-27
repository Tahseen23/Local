const RoleModel = require('../Models/Role.js')
const workermodel = require('../Models/Workermodel.js')
const clientModel = require('../Models/clientModel.js')


const getDetails=async(req,res)=>{

  const username = req.params.username 
  let user=await RoleModel.findOne({username})

  if (user.role === 'client') {
    user = await clientModel.findOne({ username })
  } else if (user.role === 'worker') {
    user = await workermodel.findOne({ username })
  }


  return res.status(200).json({user})

}


const getRole=async(req,res)=>{
  const username=req.params.username
  let user=await RoleModel.findOne({username})
  const role=user.role
  return res.status(200).json({'role':role})

}

const getHistory=async(req,res)=>{
  const username=req.params.username
  const user=await clientModel.findOne({username})
  const history=user.history
  return res.status(200).json({'history':history})
  
}


const addWorker=async(req,res)=>{
  const {username,profile,name,role,client}=req.body
  console.log(client)
  const user=await clientModel.findOne({username:client})
  console.log(user)
  const newDate={
    username:username,
    profile:profile,
    name:name,
    role:role
  }
  user.history.push(newDate)
  user.save()
  return res.status(200).json({mark:user.history})
}

module.exports={getDetails,getRole,getHistory,addWorker}