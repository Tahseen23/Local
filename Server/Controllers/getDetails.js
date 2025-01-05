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
  console.log(username)
  const user=await clientModel.findOne({username})
  console.log(user)
  const history=user.history
  return res.status(200).json({'history':history})
}


const addWorker=async(req,res)=>{
  const {username,profile,name,role,client}=req.body
  const user=await clientModel.findOne({username:client})
  const now=new Date()
  const formattedDate = now.toISOString().slice(0, 19);
  const newDate={
    username:username,
    profile:profile,
    name:name,
    role:role,
    completed:false,
    date:formattedDate,
    ratings:0,
    rated:false
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
  const formattedDate = now.toISOString().slice(0, 19);
  const newDate={
    username:username,
    name:name,
    address:address,
    date:formattedDate,
    profileLink:profileLink,
    completed:false,
    ratings:0,
    rated:false
  }
  user.jobs.push(newDate)
  user.save()
  return res.status(200).json({mark:user.jobs})
}

const addComplete=async(req,res)=>{
  const {username,client}=req.body
  const user=await workermodel.findOne({username})
  const another=await clientModel.findOne({username:client})
  const history=another.history.filter(history=>history.username==username)
  history.sort((a, b) => new Date(b.date) - new Date(a.date))
  // console.log(history)
  
  const target=user.jobs.filter(job => job.username === client);
  target.sort((a,b)=>new Date(b.date) - new Date(a.date))
  // console.log(target)
  history[0].completed=true
  target[0].completed=true
  user.save()
  another.save()
  return res.status(200).json({mark:user.jobs})
}

const addRatings=async(req,res)=>{
  const {client,worker,ratings,date}=req.body
  // console.log(ratings,date)
  const c=await clientModel.find({username:client})
  const w=await workermodel.find({username:worker})
  const filteredJobs = w
  .flatMap((user) => user.jobs || []) // Combine all jobs arrays into one
  .filter(
    (item) => item.username === client && item.date === date && item.completed
  );
  const rate=Number(ratings[worker+'_'+String(date)])
  // console.log(filteredJobs[0].ratings)
  filteredJobs[0].ratings=Math.abs(rate)%5
  if (w[0].ratings==0){
    w[0].ratings=Math.abs(rate)%5
  }else{
    w[0].ratings=(w[0].ratings*5+Math.abs(rate)%5)/5

  }
  
  filteredJobs[0].rated=true

  w.forEach(async (doc) => {
    if (typeof doc.save === "function") {
      await doc.save();
    }
  });

  
  const his=c
  .flatMap((user) => user.history || []) // Combine all jobs arrays into one
  .filter(
    (item) => item.username === worker && item.date === date && item.completed
  );
  his[0].ratings=Math.abs(rate)%5
  his[0].rated=true
  c.forEach(async (doc) => {
    if (typeof doc.save === "function") {
      await doc.save();
    }
  });
  return res.status(200)

}



const getWorker=async(req,res)=>{
  const {job,location}=req.params
  const lowerJob=job.toLowerCase()
  const worker=await workermodel.find({occupation:lowerJob})
  let loc=location.split(',')
  loc[0]=Number(loc[0])
  loc[1]=Number(loc[1])

  const sortedWorker=worker.map(work=>({
    ...work,
    distance: Math.sqrt(
      Math.pow(work.location[0] - loc[0], 2) +
      Math.pow(work.location[1] - loc[1], 2)
    )
  })).sort((a, b) => a.distance - b.distance); 

  console.log(sortedWorker)
  return res.status(200).json({sortedWorker})

}





module.exports={getDetails,getRole,getHistory,addWorker,getComments,addComments,getJobs,addJob,addComplete,addRatings,getWorker}