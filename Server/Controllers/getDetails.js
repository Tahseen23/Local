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
  const user=await clientModel.findOne({username:client})
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

const getComments=async(req,res)=>{
  const username=req.params.username
  const user=await workermodel.findOne({username})
  const comments=user.comments
  return res.status(200).json({comments:comments})

}

const addComments=async(req,res)=>{
  const {username,text,worker}=req.body
  const user=await workermodel.findOne({username:worker})
  const now=new Date()
  const formattedDate = now.toISOString().slice(0, 19);
  const newData={
    username:username,
    text:text,
    date:formattedDate
  }
  user.comments.push(newData)
  user.save()
  return res.status(200).json({mark:user.comments})

}

const getJobs=async(req,res)=>{
  const username=req.params.username
  const user=await workermodel.findOne({username})
  const jobs=user.jobs
  return res.status(200).json({jobs:jobs})

}


const addJob=async(req,res)=>{
  const {username,name,address,client,profileLink}=req.body
  const user=await workermodel.findOne({username:client})
  const now=new Date()
  const formattedDate = now.toISOString().slice(0, 10);
  const newDate={
    username:username,
    name:name,
    address:address,
    date:formattedDate,
    profileLink:profileLink,
    completed:false
  }
  user.jobs.push(newDate)
  user.save()
  return res.status(200).json({mark:user.jobs})
}

const addComplete=async(req,res)=>{
  const {username,client}=req.body
  const user=await workermodel.findOne({username})
  
  const target=user.jobs.find(job => job.username === client);
  
  target.completed=true
  user.save()
  console.log(user)
  return res.status(200).json({mark:user.jobs})
}

module.exports={getDetails,getRole,getHistory,addWorker,getComments,addComments,getJobs,addJob,addComplete}