const RoleModel = require('../Models/Role.js')
const workermodel = require('../Models/Workermodel.js')
const clientModel = require('../Models/clientModel.js')


const getDetails=async(req,res)=>{

  const username = req.params.email 
  let user=await RoleModel.findOne({username})

  if (user.role === 'client') {
    user = await clientModel.findOne({ username })
  } else if (user.role === 'worker') {
    user = await workermodel.findOne({ username })
  }


  return res.status(200).json({user})

}

module.exports={getDetails}